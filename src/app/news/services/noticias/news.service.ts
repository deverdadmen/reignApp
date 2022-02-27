import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { SeleccionService } from '../seleccion/seleccion.service';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(
    private http: HttpClient,
    private seleccionService : SeleccionService
    ) { }


/**
 * Esta funcion se activa cuando se selecciona el filtro y trae las noticias relacionadas a la seleccion
 * 
 * @param seleccion {string}
 * trae el valor seleccionado en el filtro de noticias
 * 
 * @returns {object}
 * retorna un objeto con la informacion de las noticias
 * 
 */
  getNews(seleccion : any): Observable<any>{
    
    return this.http.get(`https://hn.algolia.com/api/v1/search_by_date?query=${seleccion}&page=0`);

  }



  /**
   * Esta funcion se utiliza para traer las noticias utilizando el paginado
   * 
   * @param page 
   * trae el numero de pagina seleccionnado
   * 
   * @returns {object}
   * retorna un objeto con la informacion de las noticias
   */
  getNewss(page : any): Observable<any>{
    
    const seleccion = this.seleccionService.obtenerSeleccion();
    return this.http.get(`https://hn.algolia.com/api/v1/search_by_date?query=${seleccion}&page=${page-1}`);

  }

}
