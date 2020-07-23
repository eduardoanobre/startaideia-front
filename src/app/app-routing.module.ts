import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FerramentasComponent } from "./_components/ferramentas/ferramentas.component";
import { PaginaErroComponent } from './_components/commom/pagina-erro/pagina-erro.component';
import { PaginaNaoEncontradaComponent } from './_components/commom/pagina-nao-encontrada/pagina-nao-encontrada.component';

const routes: Routes = [
  {
    path: "",
    component: FerramentasComponent,
  },
  {
    path: 'erro',
    component: PaginaErroComponent,
  },

  // otherwise redirect to
  { path: '**', component: PaginaNaoEncontradaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
