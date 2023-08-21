import { Injectable } from '@angular/core';

import { Package } from '../interfaces/package.interface';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  list: Package[] = [
    { id: 1, icon: 'classic-bag', name: 'Bolsa sencilla', price: 0 },
    { id: 2, icon: 'small-box', name: 'Caja pequeña', price: 3000 },
    { id: 3, icon: 'medium-box', name: 'Caja mediana', price: 5000 },
  ];

  constructor() { }

}
