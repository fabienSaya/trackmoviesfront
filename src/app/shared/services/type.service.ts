import { Injectable } from '@angular/core';
import { TypeModel } from '../models/type.model';


@Injectable({
  providedIn: 'root'
})
export class TypeService {

  types: TypeModel[] = [
    {
      id: -1,
      libelle: 'tous',
    },
    {
      id: 0,
      libelle: 'film',
    },
    {
      id: 1,
      libelle: 'serie',
    }

  ]
  constructor() { }

  getTypes(): TypeModel[] {
    return this.types;
  }

  getTypesPourEditionOeuvre(): TypeModel[] {
    let typePourEdition:TypeModel[]= [this.types[1],this.types[2]];

    return typePourEdition;
  }
}
