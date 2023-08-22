import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';

import * as CryptoJS from 'crypto-js';

import { environment } from 'src/environments/environment';

import { SharedModule } from '../../shared.module';

import { CartService } from 'src/app/services/cart.service';

@Component({
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  imports: [SharedModule],
  selector: 'app-cart',
  standalone: true,
})
export class CartComponent {

  subtotal = 0;
  isOrder = false;

  constructor(
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    public Cart: CartService,
  ) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const info = this.route.snapshot.paramMap.get('info');
      if (info) this.#setByInfo(info);
      this.#load();
    }, 0);
  }

  #setByInfo(value: string) {
    this.isOrder = true;
    const cart = CryptoJS.AES.decrypt(value, 'dael_shop').toString(CryptoJS.enc.Utf8);
    this.Cart.load(JSON.parse(cart));
  }

  #load() {
    this.Cart.changes.subscribe(() => this.updateSubtotal());
    this.updateSubtotal();
  }

  updateSubtotal() {
    this.subtotal = 0;
    Object.values(this.Cart.orderList).forEach(({ product, package: productPackage, amount }) => {
      this.subtotal += (product.price + productPackage.price) * amount;
    });
  }

  buy() {
    const encodedText = encodeURIComponent('Me gustaría realizar una solicitud de compra para los siguientes productos/servicios:');
    const hashedItem = CryptoJS.AES.encrypt(localStorage.getItem('cart') || '', 'dael_shop').toString();
    const encodedURL = encodeURIComponent(`${environment.host}/order/${hashedItem}`);

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${environment.phone}&text=${encodedText}%20${encodedURL}`;
    const safeUrl: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(whatsappUrl);

    console.log(65, whatsappUrl);

    window.open(safeUrl.toString(), '_blank');
  }

  ngOnDestroy(): void {
    if (this.isOrder) this.Cart.load()
  }

}
