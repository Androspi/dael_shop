import { Injectable } from '@angular/core';

import { Product } from '../interfaces/product.interface';
import { Package } from '../interfaces/package.interface';
import { ProductService } from './product.service';
import { PackageService } from './package.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  productList: Record<string, { product: Product, package: Package, amount: number; }> = {};

  constructor(
    private Products: ProductService,
    private Packages: PackageService,
  ) {
    const cart = this.#cart();
    const products = Object.entries<Record<string, string | number>>(cart.products);

    products.forEach(([key, { pdt, pkg, cnt }]) => {
      const product = this.Products.list.find(({ id }) => id === pdt);
      const productPackage = this.Packages.list.find(({ id }) => id === pkg);

      if (!product || !productPackage) return;

      this.productList[key] = { product, package: productPackage, amount: +cnt };
    });
  }

  #cart() {
    const { cart: cartJson = '{"products":{}}' } = localStorage;
    return JSON.parse(cartJson);
  }

  appendProduct(productId: string, packageId: number) {
    const product = this.Products.list.find(({ id }) => id === productId);
    const productPackage = this.Packages.list.find(({ id }) => id === packageId);

    if (!product || !productPackage) return;

    const cart = this.#cart();
    const key = `PDT${productId}-PKG${packageId}`;

    cart.products[key] = { pdt: productId, pkg: packageId, cnt: 1 };
    cart.update = Date.now();

    localStorage.setItem('cart', JSON.stringify(cart));

    this.productList[key] = { product, package: productPackage, amount: 1 };
  }

}
