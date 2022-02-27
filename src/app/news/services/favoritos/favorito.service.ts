import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritoService {

  constructor() { }

/**
 * Esta funcion se utiliza para agregar la noticia marcada como favorita a la lista ubicada en el local storage
 * 
 * @param favorito 
 * trae la noticia a Agregar
 */

  addFav(favorito : any){

    var favoritos = [];
    var temporal = localStorage.getItem('favoritos'); 
    if(temporal != null){
      favoritos = JSON.parse(temporal);
      favoritos.push(favorito);
      localStorage.setItem('favoritos',JSON.stringify(favoritos))
    }else{
      favoritos.push(favorito)
      localStorage.setItem('favoritos',JSON.stringify(favoritos))
    }
    
  }

  /**
   * Esta funcion retorna la lista de noticias que estan marcadas como favoritas
   * 
   * @returns {array}
   */
  getFav(): Observable<any[]>{

    var favoritos = [];
    var aux = localStorage.getItem('favoritos');
    if(aux != null){
      favoritos = JSON.parse(aux);
    }
    return of (favoritos);

  }

  /**
   * Esta funcion se utiliza para eliminar la noticia de la lista de favoritos
   * 
   * @param favorito 
   * trae la noticia a eliminar
   * 
   * @returns {array} 
   */
  removeFav(favorito : any){

    var i = 0
    var favoritos = [];
    var temporal = localStorage.getItem('favoritos'); 
    if(temporal != null){
      
      favoritos = JSON.parse(temporal);
      for(const fav of favoritos){
        
        if(fav.parent_id === favorito.parent_id){
          favoritos.splice( i, 1 );
          localStorage.setItem('favoritos',JSON.stringify(favoritos))
        }
        i += 1
      }
    }
    return favoritos

  }


  /**
   * Esta funcion se utiliza para saber si la noticia esta en la lista de favoritos
   * y asi poder colocar el tipo de corazon dependiendo si esta o no
   * 
   * @param favorito 
   * trae la noticia a comparar
   * @returns {boolean}
   */

  isfav(favorito : any){

    var favoritos = [];
    var temporal = localStorage.getItem('favoritos'); 
    if(temporal != null){    
      favoritos = JSON.parse(temporal);
      for(const fav of favoritos){ 
        if(fav.parent_id === favorito.parent_id){
          return true
        }
      }
    }
    return false
    
  }

}
