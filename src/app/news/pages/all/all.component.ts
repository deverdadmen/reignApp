import { Component, OnInit } from '@angular/core';
import { FavoritoService } from '../../services/favoritos/favorito.service';

import { NewsService } from '../../services/noticias/news.service';
import { SeleccionService } from '../../services/seleccion/seleccion.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit {

  seleccionado : any = "Select your news"
  page = 1
  noticias: any[] = []
  retorno: any[] = []

  constructor(
    private newsService : NewsService,
    private favoritosService : FavoritoService,
    private seleccionService : SeleccionService
  ) { }

  ngOnInit(): void {
    /**
     * Aqui se reviza si existe un filtro seleccionado anteriormente para traer la noticias relacionadas
     */
    var comprobante = this.seleccionService.obtenerSeleccion()
    if(comprobante != null && comprobante != ''){
      this.seleccionado = comprobante ;
      this.seleccion(this.seleccionado)
    }
    
  }

  /**
   * se utiliza para traer las noticias relacionadas a este
   * 
   * @param seleccionado 
   * Filtro seleccionado para traer noticias relacionadas
   */
  seleccion(seleccionado : string){

    this.seleccionado = seleccionado;
    this.page = 1;
    this.seleccionService.guardarSeleccion(seleccionado)
    this.newsService.getNews(seleccionado)
    .subscribe( data => this.noticias = data.hits)

  }

  /**
   * Se utiliza para traer las noticias del tema filtrado y utilizando la paginacion
   * 
   * @param page 
   * numero de la paginacion
   */
  pagina(page : any){

    this.newsService.getNewss(page)
    .subscribe( data => this.noticias = data.hits)

  }

  /**
   * Se utiliza para agregar a lista de favoritos que se guarda en el local storage 
   * 
   * @param noticia 
   * noticia seleccionada para agregar a favoritos
   */
  addFavorito(noticia:any){

    this.favoritosService.addFav(noticia);

  }

  /**
   * Se utiliza para saber si esta noticia se encuentra en la lista de favoritos del local storage
   * 
   * @param noticia 
   * noticia seleccionada
   * 
   * @returns {boolean}
   */
  esFavorito(noticia:any){

    const favorito = this.favoritosService.isfav(noticia)
    return favorito

  }

   /**
   * Esta funcion llama al service de Favoritos para eliminar la noticia seleccionada de la lista de favoritos
   * 
   * @param noticia 
   * noticia a eliminar
   */
  remove(noticia : any){

    const remove = this.favoritosService.removeFav(noticia);

   }

   /**
    * Se utiliza para saber si se cumplen los requerimientos basicos de la noticia para ser mostradas
    * estos parametos son: author, story_title, story_url, created_at.
    * 
    * @param noticia 
    * noticia seleccionada
    * 
    * @returns {boolean}
    */
   cumple(noticia : any){

    if(noticia.author === null || noticia.story_title === null || noticia.story_url === null || noticia.create_at === null){
      return false;  
    }
    return true

   }

  /**
   * Esta funcion se utiliza para saber hace cuanto tiempo se encuentra publicada la noticia
   * 
   * @param fecha 
   * Es la fecha de creacion de la noticia
   * 
   * @returns {string}
   * Retorna un mensaje de hace cuanto tiempo se lanzo la noticia
   */
   tiempo(fecha : any){
    var tiempo = '';

    var time = new Date().getTime() - new Date(fecha).getTime();
    var days = Math.floor(time/(24*3600*1000))
    var leave1 = time % (24 * 3600 * 1000);
    var hours = Math.floor(leave1 / (3600 * 1000));
    var leave2 = leave1 % (3600 * 1000);
    var minutes = Math.floor(leave2 / (60 * 1000));
    var leave3 = leave2 % (60 * 1000);
    var seconds = Math.round(leave3 / 1000);

    if(days > 0){
      tiempo = `${days} days ago by`
    }else{
      if(hours > 0){
        tiempo = `${hours} hours ago by`
      }else{
        if(minutes > 0){
          tiempo = `${minutes} minutes ago by`
        }else{
          tiempo = `${seconds} minutes ago by`
        }
      }   
    }
    return tiempo;
   }
}
