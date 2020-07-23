import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FerramentasComponent } from "./_components/ferramentas/ferramentas.component";
import { NovaFerramentaComponent } from "./_components/nova-ferramenta/nova-ferramenta.component";
import { FerramentaPorTagComponent } from "./_components/ferramenta-por-tag/ferramenta-por-tag.component";
import { AppMaterialModule } from "./_modules/app-material.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AutofocusDirective } from "./_directives/autofocus.directive";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { PaginaErroComponent } from "./_components/commom/pagina-erro/pagina-erro.component";
import { PaginaNaoEncontradaComponent } from "./_components/commom/pagina-nao-encontrada/pagina-nao-encontrada.component";
import { ConfirmationDialogComponent } from "./_components/commom/confirmation-dialog/confirmation-dialog.component";
import { HeaderComponent } from "./_components/commom/header/header.component";
import { FooterComponent } from "./_components/commom/footer/footer.component";
import { MessagesComponent } from "./_components/commom/messages/messages.component";
import { TagsFormatPipe } from "./_pipes/tags-format.pipe";

@NgModule({
  declarations: [
    AppComponent,
    ConfirmationDialogComponent,
    FerramentasComponent,
    NovaFerramentaComponent,
    FerramentaPorTagComponent,
    HeaderComponent,
    FooterComponent,
    TagsFormatPipe,
    AutofocusDirective,
    MessagesComponent,
    PaginaErroComponent,
    PaginaNaoEncontradaComponent,
  ],
  entryComponents: [ConfirmationDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppMaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
