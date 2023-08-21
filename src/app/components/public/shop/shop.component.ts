import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';

import { SharedModule } from '../../shared.module';

import { ProductService } from 'src/app/services/product.service';

import { Product } from 'src/app/interfaces/product.interface';
import { CartService } from 'src/app/services/cart.service';

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

  categoryId: undefined | number;

  products: Product[] = [];

  constructor(
    private Products: ProductService,
    private route: ActivatedRoute,
    public Cart: CartService,
    private router: Router,
  ) { }

  ngAfterViewInit(): void {
    const appWidth = () => this.vw = window.innerWidth;
    window.addEventListener('resize', appWidth);
    appWidth();

    this.route.queryParams.subscribe(({ ctg, fnd }) => {
      this.categoryId = ctg ? +ctg : undefined;

      if (fnd) {
        const searcher = document.querySelector<HTMLInputElement>('#input-searcher');
        if (searcher) searcher.value = fnd;
      }

      this.products = this.Products.list.filter(({ categories, name }) => {
        if (this.categoryId && !categories.includes(this.categoryId)) return false;
        if (fnd && !name.toLowerCase().includes(fnd.toLowerCase())) return false;
        return true;
      });
    })
  }

  setCategory = (category: number) => {
    this.router.navigate([`/shop`], { relativeTo: this.route, queryParams: { ctg: this.categoryId === category ? undefined : category } });
  }

  #searchInterval = 0;
  search = (event: HTMLInputElement) => {
    this.router.navigate([`/shop`], { relativeTo: this.route, queryParams: { ctg: this.categoryId, fnd: event.value } });
  }

  ngOnDestroy(): void {
    clearTimeout(this.#searchInterval);
  }

}
