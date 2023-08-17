import { Component } from '@angular/core';
import { SharedModule } from '../../shared.module';

@Component({
  styleUrls: ['./shop.component.scss'],
  templateUrl: './shop.component.html',
  imports: [SharedModule],
  selector: 'app-shop',
  standalone: true,
})
export class ShopComponent {

  vw = 0;

  categories = [
    { id: 1, icon: 'pendant', name: 'Collares' },
    { id: 2, icon: 'bracelet', name: 'Pulseras' },
    { id: 3, icon: 'earrings', name: 'Aretes' },
    { id: 4, icon: 'ring', name: 'Anillos' },
  ];

  products = [{
    name: 'Collar en forma de perla',
    date: Date.now(),
    description: '',
    material: '',
    rotation: '329.8deg',
    category: 1,
    unities: 1,
    galery: [],
    color: '',
    image: 'products/pendant-3855108_640.png',
    price: 12e3,
    id: 1,
  }, {
    name: 'Anillo corazón rojo',
    date: Date.now(),
    description: '',
    rotation: '218.24deg',
    material: '',
    category: 3,
    unities: 1,
    galery: [],
    color: '',
    image: 'products/ring-3417372_640.png',
    price: 15e3,
    id: 2,
  }, {
    name: 'Pulsera blanca',
    date: Date.now(),
    description: '',
    rotation: '331.6deg',
    material: '',
    category: 2,
    unities: 1,
    galery: [],
    color: '',
    image: 'products/bracelet-4704067_640.png',
    price: 22e3,
    id: 3,
  }, {
    name: 'Anillo perla verde',
    date: Date.now(),
    description: '',
    material: '',
    rotation: '20.45deg',
    category: 4,
    unities: 1,
    galery: [],
    color: '',
    image: 'products/ring-5501369_640.png',
    price: 15e3,
    id: 4,
  }];

  ngAfterViewInit(): void {
    const appWidth = () => this.vw = window.innerWidth;
    window.addEventListener('resize', appWidth);
    appWidth();
  }

}
