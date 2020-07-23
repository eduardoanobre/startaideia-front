import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import {
  NovaFerramenta,
  RawFormNovaFerramentaValue,
} from "../_models/nova-ferramenta";
import { Ferramenta } from "../_models/ferramenta";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ToolService {
  constructor(private http: HttpClient) {}

  /**
   * cria uma ferramenta
   *
   * @param value - form.value()
   */
  salvarFerramenta(value: any) {
    const formData = new NovaFerramenta(value as RawFormNovaFerramentaValue);
    return this.http.post(`${environment.api}/tools`, formData);
  }

  /**
   * exclui um ferramenta
   *
   * @param id - id da ferramenta
   */
  excluirFerramenta(id: any) {
    return this.http.delete(`${environment.api}/tools/${id}`);
  }

  /**
   * obtém todas as ferramentas
   *
   * o método da API get tools contém uma barra no final da url para evitar conflito
   */
  obterFerramentas(filtro: string): Observable<Ferramenta[]> {
    return this.http.get<Ferramenta[]>(`${environment.api}/tools/${filtro}`);
  }

  /**
   * obter ferramentas filtradas por tag
   *
   * @param filtro
   */
  obterFerramentasPorTag(filtro: string) {
    return this.http.get<Ferramenta[]>(
      `${environment.api}/tools?tag=${filtro}`
    );
  }

  /**
   * obtém todas as tags cadastradas
   */
  obterTagsCadastradas(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.api}/tags`);
  }
}
