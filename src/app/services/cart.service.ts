import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { BootstrapUtilities } from '../utilties/bootstrap.utility';

import { ProductService } from './product.service';
import { PackageService } from './package.service';

import { Product } from '../interfaces/product.interface';
import { Package } from '../interfaces/package.interface';

interface OrderInfo {
  product: Product;
  package: Package;
  amount: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  changes = new Subject<void>();

  orderList: Record<string, Order> = {};

  constructor(
    private Products: ProductService,
    private Packages: PackageService,
  ) {
    this.load();
  }

  load(cart: any = this.#cart()) {
    this.orderList = {};

    const products = Object.entries<Record<string, string | number>>(cart.products);

    products.forEach(([key, { pdt, pkg, cnt }]) => {
      const product = this.Products.list.find(({ id }) => id === pdt);
      const productPackage = this.Packages.list.find(({ id }) => id === pkg);

      if (!product || !productPackage) return;

      this.orderList[key] = new Order(product, productPackage, +cnt);
    });

    this.changes.next();
  }

  #cart() {
    const { cart: cartJson = '{"products":{}}' } = localStorage;
    return JSON.parse(cartJson);
  }

  append(productId: string, packageId: number) {
    const product = this.Products.list.find(({ id }) => id === productId);
    const productPackage = this.Packages.list.find(({ id }) => id === packageId);

    if (!product || !productPackage) return;

    const cart = this.#cart();
    const key = `PDT${productId}-PKG${packageId}`;

    cart.products[key] = { pdt: productId, pkg: packageId, cnt: 1 };
    cart.update = Date.now();

    localStorage.setItem('cart', JSON.stringify(cart));

    this.orderList[key] = new Order(product, productPackage, 1);

    this.changes.next();
  }

  update<K extends keyof Order>(id: string, key: K, value: Order[K]) {
    const order = this.orderList[id];

    const cart = this.#cart();

    cart.products[id] = { pdt: order.product.id, pkg: order.package.id, cnt: order.amount };
    cart.update = Date.now();

    localStorage.setItem('cart', JSON.stringify(cart));

    order[key] = value;

    this.changes.next();
  }

  delete(key: string) {
    const cart = this.#cart();
    delete cart.products[key];
    cart.update = Date.now();

    delete this.orderList[key];

    localStorage.setItem('cart', JSON.stringify(cart));
    this.changes.next();
  }

}

class Order implements OrderInfo {

  private Amount = 0;

  public get amount() {
    return this.Amount;
  }

  public set amount(val: number) {
    if (this.product.unities < val) {
      this.Amount = this.product.unities;
      BootstrapUtilities.toggleToast('#ds-alert', 'show');
      return;
    };

    if (!val) {
      this.Amount = 1;
      return;
    }

    this.Amount = val;
  }

  public product: Product;
  public package: Package;

  constructor(
    product: Product,
    productPackage: Package,
    amount: number,
  ) {
    this.package = productPackage;
    this.product = product;
    this.amount = amount;
  }

}