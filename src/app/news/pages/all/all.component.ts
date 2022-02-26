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
  
    var comprobante = this.seleccionService.obtenerSeleccion()
    if(comprobante != null || comprobante != ''){
      this.seleccionado = comprobante ;
      this.seleccion(this.seleccionado)
    }
    
  }

  seleccion(seleccionado : string){

    this.seleccionado = seleccionado;
    this.page = 1;
    this.seleccionService.guardarSeleccion(seleccionado)
    this.newsService.getNews(seleccionado)
    .subscribe( data => this.noticias = data.hits)

  }

  pagina(page : any){

    this.newsService.getNewss(page)
    .subscribe( data => this.noticias = data.hits)

  }

  addFavorito(noticia:any){

    this.favoritosService.addFav(noticia);

  }

  esFavorito(noticia:any){

    const favorito = this.favoritosService.isfav(noticia)
    return favorito

  }

  remove(noticia : any){

    const remove = this.favoritosService.removeFav(noticia);

   }

   cumple(noticia : any){

    if(noticia.author === null || noticia.story_title === null || noticia.story_url === null || noticia.create_at === null){
      return false;  
    }

    return true

   }

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
