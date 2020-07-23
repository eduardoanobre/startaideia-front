import {
  Component,
  OnInit,
  Renderer2,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ToolService } from "src/app/_services/tool-service.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import ErroUtils from "src/app/_helpers/error.util";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
} from "@angular/material/autocomplete";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { MatChipInputEvent } from "@angular/material/chips";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-nova-ferramenta",
  templateUrl: "./nova-ferramenta.component.html",
  styleUrls: ["./nova-ferramenta.component.scss"],
})
export class NovaFerramentaComponent implements OnInit {
  public form: FormGroup;
  public erro: string | null;
  public submetendo: boolean;
  filteredTags: Observable<string[]>;
  tagCtrl = new FormControl();
  tags: string[] = [];
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  allTags: string[];

  @ViewChild("tagInput") tagInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;

  constructor(
    private titleService: Title,
    private toolService: ToolService,
    private snackBar: MatSnackBar,
    private renderer: Renderer2,
    private dialog: MatDialogRef<NovaFerramentaComponent>
  ) {
    // obtém todas as tags cadastradas
    this.toolService.obterTagsCadastradas().subscribe(
      (data) => {
        this.allTags = data;

        this.filteredTags = this.tagCtrl.valueChanges.pipe(
          startWith(null),
          map((tag: string | null) =>
            tag ? this._filter(tag) : this.allTags.slice()
          )
        );
      },
      (error) => {
        this.erro = ErroUtils.parse(error);
        this.submetendo = false;
      }
    );
  }

  ngOnInit(): void {
    this.titleService.setTitle("Add new tool");

    this.form = new FormGroup({
      title: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.minLength(5)])
      ),
      description: new FormControl(""),
      link: new FormControl(""),
      tags: new FormControl(""),
    });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || "").trim()) {
      this.tags.push(value.trim());
    }

    if (input) {
      input.value = "";
    }

    this.tagCtrl.setValue(null);
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = "";
    this.tagCtrl.setValue(null);
  }

  salvar() {
    if (this.form.invalid) {
      return;
    }
    this.submetendo = true;
    this.form.controls.tags.setValue(this.tags);

    this.toolService.salvarFerramenta(this.form.value).subscribe(
      (data) => {
        if (data) {
          this.openSnackBar("success new tool", "Tool");
          this.dialog.close();
        }
      },
      (error) => {
        this.erro = ErroUtils.parse(error);
        this.submetendo = false;
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  enter(input: string): void {
    const element = this.renderer.selectRootElement("." + input);
    setTimeout(() => element.focus(), 0);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(
      (tag) => tag.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
