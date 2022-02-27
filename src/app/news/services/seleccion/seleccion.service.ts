import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeleccionService {

  constructor() { }

  /**
   * 
   * @param seleccionado {string}
   * Trae el valor del filtro de noticias para guardarlo en el local storage
   */
  guardarSeleccion(seleccionado : string){

    localStorage.setItem('seleccion',seleccionado)

  }

  /**
   * 
   * @returns {string}
   * retorna el valor almazenado en el local storage del ultimo valor del filtro de noticias
   */
  obtenerSeleccion(){

    return localStorage.getItem('seleccion')

  }
  
}
