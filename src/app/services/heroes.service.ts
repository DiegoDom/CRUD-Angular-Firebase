import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://crud-angular-f9451.firebaseio.com';

  constructor(private http: HttpClient) { }

  createHero( hero: HeroeModel ) {
    return this.http.post(`${ this.url }/heroes.json`, hero)
    .pipe(
      map((resp: any) => {
        hero.id = resp.name;
        return hero;
      })
    );
  }

  updateHero(hero: HeroeModel) {
    const heroTemp = {
      ...hero
    };
    delete heroTemp.id;
    return this.http.put(`${ this.url}/heroes/${ hero.id }.json`, heroTemp);
  }

  getHeros() {
    return this.http.get(`${ this.url}/heroes.json`)
            .pipe(
              map(this.createArray),
              delay(0)
            );
  }

  getHero(id: string) {
    return this.http.get(`${ this.url}/heroes/${ id }.json`);
  }

  deleteHero(id: string) {
    return this.http.delete(`${ this.url}/heroes/${ id }.json`);
  }

  private createArray(herosObj: object) {
    const heroes: HeroeModel[] = [];
    if ( herosObj === null ) { return []; }
    Object.keys( herosObj ).forEach( key => {
      const hero: HeroeModel = herosObj[key];
      hero.id = key;
      heroes.push( hero );
    });
    return heroes;
  }

}
