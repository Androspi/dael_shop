import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Component } from '@angular/core';

import { SharedModule } from '../../shared.module';

import { ProductService } from 'src/app/services/product.service';
import { PackageService } from 'src/app/services/package.service';

import { Product } from 'src/app/interfaces/product.interface';
import { Package } from 'src/app/interfaces/package.interface';
import { CartService } from 'src/app/services/cart.service';

@Component({
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  imports: [SharedModule],
  selector: 'app-product',
  standalone: true,
})
export class ProductComponent {

  productId!: string;
  packageId!: number;

  product: undefined | Product;
  package: undefined | Package;

  subtotal = 0;

  vw = 0;

  packagePage = {
    page: 0,
    limit: 0,
    start: 0,
    end: 0,
    list: 0,
  }

  constructor(
    public Packages: PackageService,
    public Products: ProductService,
    private route: ActivatedRoute,
    private Cart: CartService,
    private router: Router,
  ) {
    this.productId = this.route.snapshot.paramMap.get('id') as string;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.product = this.Products.list.find(({ id }) => id === this.productId);
      this.setSubtotal();

      this.route.queryParams.subscribe(({ pkg = '1' }) => {
        this.packageId = +pkg;
        this.package = this.Packages.list.find(({ id }) => +pkg === id);
        this.setSubtotal();
      });

      window.addEventListener('resize', appWidth);
      appWidth();
    }, 0);

    const appWidth = () => {
      this.vw = window.innerWidth;
      this.setPackageLimit();
    }
  }

  setSelectedPackage(val: number) {
    this.router.navigate([`/product/${this.productId}`], { relativeTo: this.route, queryParams: { pkg: val } });
  }

  setSubtotal() {
    if (!this.product || !this.package) return;
    this.subtotal = this.product.price + this.package.price;
  }

  setPackageLimit() {
    this.packagePage.limit = this.vw > 486 ? 4 : 3;
    this.packagePage.list = Math.ceil(this.Packages.list.length / 3);
    this.setPackagePage(1);
  }

  setPackagePage(val: number) {
    this.packagePage.page += val;
    this.packagePage.start = (this.packagePage.page - 1) * this.packagePage.limit;
    this.packagePage.end = this.packagePage.start + this.packagePage.limit;
  }

  appendProduct() {
    this.Cart.appendProduct(this.productId, this.packageId);
    this.router.navigate(['/shop']);
  }

}
