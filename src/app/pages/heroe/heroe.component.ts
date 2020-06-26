import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { HeroeModel } from '../../models/heroe.model';
import { HeroesService } from '../../services/heroes.service';

import Swal from 'sweetalert2';



@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  hero = new HeroeModel();

  constructor(private heroService: HeroesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if ( id !== 'nuevo' ) {
      this.heroService.getHero(id)
      .subscribe((resp: HeroeModel) => {
        this.hero = resp;
        this.hero.id = id;
      }, (err) => {
        console.log(err);
      });
    }

  }

  guardarHeroe(form: NgForm) {
    if (form.invalid) {
      console.log('Formulario invalido');
      Object.values( form.controls ).forEach( control => {
        control.markAsTouched();
      });
      return;
    }

    Swal.fire({
      title : 'Espere',
      text : 'Guardando la información',
      icon: 'info',
      allowOutsideClick : false
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if ( this.hero.id  ) {
      peticion = this.heroService.updateHero(this.hero);
    } else {
      peticion = this.heroService.createHero(this.hero);
    }

    peticion.subscribe(result => {
      Swal.fire({
        title : `${ this.hero.name }`,
        text : 'Guardando correctamente',
        icon: 'success',
        allowOutsideClick : false
      });
      /* console.log(result); */
    }, (err) => {
      /* console.log(err); */
      Swal.fire({
        title : 'Lo sentimos!',
        text : 'Ocurrio un error inesperado',
        icon: 'error',
        allowOutsideClick : false
      });
    });

  }

}
