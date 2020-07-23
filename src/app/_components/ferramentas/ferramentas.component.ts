import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  HostListener,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { NovaFerramentaComponent } from "../nova-ferramenta/nova-ferramenta.component";
import { Title } from "@angular/platform-browser";
import { ToolService } from "src/app/_services/tool-service.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Observable, of, fromEvent } from "rxjs";
import { Ferramenta } from "src/app/_models/ferramenta";
import {
  catchError,
  filter,
  debounceTime,
  distinctUntilChanged,
  tap,
} from "rxjs/operators";
import { HttpErrorResponse } from "@angular/common/http";
import { ConfirmationDialogComponent } from "../commom/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: "app-ferramentas",
  templateUrl: "./ferramentas.component.html",
  styleUrls: ["./ferramentas.component.scss"],
})
export class FerramentasComponent implements OnInit, AfterViewInit {
  public ferramentas$: Observable<Ferramenta[]>;
  public filtredByTag = false;
  @ViewChild("search") input: ElementRef;

  @HostListener("click", ["$event"])
  onClick(e: { target: HTMLAnchorElement }) {
    if (e.target.classList.contains("linkTag")) {
      let value = (<HTMLAnchorElement>e.target).innerHTML.substring(1);
      this.filtredByTag = true;
      this.input.nativeElement.value = value;

      // carrega todas as ferramentas
      this.carregaTodasFerramentas(value);
    }
  }

  constructor(
    public dialog: MatDialog,
    public confirmDialog: MatDialog,
    private titleService: Title,
    private toolService: ToolService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.iniciaTitulo();

    // carrega todas as ferramentas
    this.carregaTodasFerramentas("");
  }

  ngAfterViewInit(): void {
    fromEvent(this.input.nativeElement, "keyup")
      .pipe(
        filter(Boolean),
        debounceTime(150),
        distinctUntilChanged(),
        tap((text) => {
          this.carregaTodasFerramentas(this.input.nativeElement.value);
        })
      )
      .subscribe();
  }

  /**
   * carrega todas as ferramentas com filtro
   */
  carregaTodasFerramentas(filtro: string) {
    if (this.filtredByTag === true) {
      // obtém todas as ferramentas
      this.ferramentas$ = this.toolService.obterFerramentasPorTag(filtro).pipe(
        catchError((erro) => {
          return this.error(erro);
        })
      );
    } else {
      // obtém todas as ferramentas
      this.ferramentas$ = this.toolService.obterFerramentas(filtro).pipe(
        catchError((erro) => {
          return this.error(erro);
        })
      );
    }
  }

  openDialogNovaFerramenta() {
    const dialogRef = this.dialog.open(NovaFerramentaComponent, {
      data: {},
      panelClass: "myapp-no-padding-dialog",
      width: "350px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      // limpa campos de filtro
      this.filtredByTag = false;
      this.input.nativeElement.value = "";

      // carrega todas as ferramentas
      this.carregaTodasFerramentas("");

      // inicia título da página
      this.iniciaTitulo();
    });
  }

  excluir(ferramenta: Ferramenta) {
    // título da página
    this.titleService.setTitle("remove tool");

    const dialogRef = this.confirmDialog.open(ConfirmationDialogComponent, {
      width: "350px",
      data: {
        message: "Are you sure you want to remove " + ferramenta.title + "?",
        detail: "",
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // exclui a ferramenta se confirmado
        this.toolService.excluirFerramenta(ferramenta.id).subscribe(
          (data) => {
            // limpa campos de filtro
            this.filtredByTag = false;
            this.input.nativeElement.value = "";

            // carrega todas as ferramentas
            this.carregaTodasFerramentas("");

            // exibe mensagem de confirmação
            this.openSnackBar("delete success", "Tool");
          },
          (error) => {
            this.router.navigate(["erro"], {
              state: { error: "could not delete tool" },
            });
          }
        );
      }

      // inicia título da página
      this.iniciaTitulo();
    });
  }

  /**
   * realiza filtro ao alterar chackbox
   */
  filtroChange() {
    // carrega todas as ferramentas
    this.carregaTodasFerramentas(this.input.nativeElement.value);
  }

  /**
   * método genérico para tratar erro
   *
   * @param erro
   */
  error(erro: { error: { message: string } }): Observable<any> {
    let mensagem: string = "no data available";

    // HttpErrorResponse
    if (erro instanceof HttpErrorResponse) {
      this.router.navigate(["erro"], { state: { error: mensagem } });
      return of(null);
    }

    mensagem = erro.error.message;
    console.log("mensagem: " + mensagem);
    this.router.navigate(["erro"], { state: { error: mensagem } });
    return of(null);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  /**
   * inicia título da página
   */
  iniciaTitulo() {
    // title page
    this.titleService.setTitle("VUTTR - Very useful tools to remember");
  }
}
