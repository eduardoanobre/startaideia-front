import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs/operators";

@Component({
  selector: "app-pagina-erro",
  templateUrl: "./pagina-erro.component.html",
  styleUrls: ["./pagina-erro.component.scss"],
})
export class PaginaErroComponent implements OnInit {
  public erro$: Observable<object>;

  constructor(public activatedRoute: ActivatedRoute) {}
  ngOnInit() {
    this.erro$ = this.activatedRoute.paramMap.pipe(
      map(() => window.history.state)
    );
  }
}
