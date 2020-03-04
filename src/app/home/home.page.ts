import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { CartPage } from '../cart/cart.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {


  cart = [];
  products = [];
  cartItemCount: BehaviorSubject<number>;
  productSearch = [];

  constructor(
    private cartService: CartService,
    private modalCtrl: ModalController,
    private router: Router

    ) {}

  ngOnInit() {
    this.productSearch = this.cartService.getProducts();
    this.products = this.cartService.getProducts();
    this.cart = this.cartService.getCart();
    this.cartItemCount = this.cartService.getCartItem();
  }

  addtoCart(getProducts: any){
    this.cartService.addProduct(getProducts);
  }

  openCart() {
    this.router.navigate(['/cart']);
  }


  openPreview(id) {
    this.router.navigate(['/productmodal', id]);
  }

  search(e) {
    this.products = this.productSearch.filter(p => {
      return p.name.toUpperCase().includes(e.target.value.toUpperCase()) || p.category.toUpperCase().includes(e.target.value.toUpperCase());
    })
  }

  searchCategory(e) {
    this.products = this.productSearch.filter(p => {
      return p.category.toUpperCase().includes(e.toUpperCase());
    });
  }
}
