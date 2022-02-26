import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeleccionService {

  constructor() { }

  
  guardarSeleccion(seleccionado : string){

    localStorage.setItem('seleccion',seleccionado)

  }

  obtenerSeleccion(){

    return localStorage.getItem('seleccion')

  }
  
}
