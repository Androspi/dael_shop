import { Injectable } from '@angular/core';

import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  list: Product[] = [{
    name: 'Collar forma perla',
    date: Date.now(),
    description: 'Collar covergold en base de rodio',
    material: '',
    rotation: '329.8deg',
    categories: [1],
    unities: 1,
    galery: [],
    color: '',
    image: 'products/pendant-3855108_640.png',
    price: 12e3,
    id: '1',
  }, {
    name: 'Anillo corazón rojo',
    date: Date.now(),
    description: 'Anillo covergold en base de rodio',
    rotation: '218.24deg',
    material: '',
    categories: [4],
    unities: 1,
    galery: [],
    color: '',
    image: 'products/ring-3417372_640.png',
    price: 15e3,
    id: '2',
  }, {
    name: 'Pulsera blanca',
    date: Date.now(),
    description: 'Pulsera covergold en base de rodio',
    rotation: '331.6deg',
    material: '',
    categories: [2],
    unities: 1,
    galery: [],
    color: '',
    image: 'products/bracelet-4704067_640.png',
    price: 22e3,
    id: '3',
  }, {
    name: 'Anillo perla verde',
    date: Date.now(),
    description: 'Anillo covergold en base de rodio',
    material: '',
    rotation: '20.45deg',
    categories: [4],
    unities: 1,
    galery: [],
    color: '',
    image: 'products/ring-5501369_640.png',
    price: 15e3,
    id: '4',
  }];

  constructor() { }

}
