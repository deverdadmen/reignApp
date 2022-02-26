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

  getNews(seleccion : any): Observable<any>{
    
    return this.http.get(`https://hn.algolia.com/api/v1/search_by_date?query=${seleccion}&page=0`);

  }
  getNewss(page : any): Observable<any>{
    
    const seleccion = this.seleccionService.obtenerSeleccion();
    return this.http.get(`https://hn.algolia.com/api/v1/search_by_date?query=${seleccion}&page=${page-1}`);

  }

}
