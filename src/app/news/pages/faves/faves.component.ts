import { Component, OnInit } from '@angular/core';
import { FavoritoService } from '../../services/favoritos/favorito.service';

@Component({
  selector: 'app-faves',
  templateUrl: './faves.component.html',
  styleUrls: ['./faves.component.scss']
})
export class FavesComponent implements OnInit {
  noticias: any[] = []
  constructor(
    private favoritosService : FavoritoService
  ) { }

  ngOnInit(): void {

    this.favoritosService.getFav().subscribe( data => this.noticias = data )
    
  }

  remove(noticia : any){

   this.noticias = this.favoritosService.removeFav(noticia);

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
