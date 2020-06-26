import { Component, OnInit } from '@angular/core';

import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../../models/heroe.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heros: HeroeModel[] = [];
  cargando = false;

  constructor(private herosService: HeroesService) { }

  ngOnInit(): void {
    this.cargando = true;
    this.herosService.getHeros()
    .subscribe(resp => {
      this.heros = resp;
      this.cargando = false;
    }
    , (err) => {
      console.log(err);
      this.cargando = false;
    });
  }

  deleteHero(hero: HeroeModel, index: number) {
    Swal.fire({
      title: 'Atención!',
      text: `Estas seguro de querer eliminar a ${ hero.name }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
      allowOutsideClick : false
    }).then((result) => {
      if (result.value) {
        this.herosService.deleteHero(hero.id)
        .subscribe(() => {
          Swal.fire({
            title : '',
            text : 'Eliminado correctamente',
            icon: 'success',
            allowOutsideClick : false
          });
          this.heros.splice(index , 1);
        }, () => {
          Swal.fire({
            title : 'Lo sentimos!',
            text : 'Ocurrio un error inesperado',
            icon: 'error',
            allowOutsideClick : false
          });
        });
      }
    });
  }

}
