import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService, Product } from '../cart.service';
import { BehaviorSubject } from 'rxjs';
import { ModalController, ToastController } from '@ionic/angular';
import { CartPage } from '../cart/cart.page';

@Component({
  selector: 'app-productmodal',
  templateUrl: './productmodal.page.html',
  styleUrls: ['./productmodal.page.scss'],
})
export class ProductmodalPage implements OnInit {
  data: Product;
  id: number;
  counter = 0;

  cart = [];
  products = [];
  cartItemCount: BehaviorSubject<number>;

  constructor(
    public actvtedRoute: ActivatedRoute,
    private cartService: CartService,
    private modalCtrl: ModalController,
    private router: Router,
    private toastCtrl: ToastController
    ) {}

  ngOnInit() {
    this.products = this.cartService.getProducts();
    this.cart = this.cartService.getCart();
    this.cartItemCount = this.cartService.getCartItem();
    this.getProduct();
  }

  decreaseCartItem(product) {
    this.cartService.descreaseProduct(product);
  }

  increaseCartItem(product) {
    this.cartService.addProduct(product);
    console.log(this.cartService);
  }

  async addtoCart(getProducts: any) {
    this.cartService.addProduct(getProducts);
    const toast = this.toastCtrl.create({
      message: 'Added to cart',
      duration: 1000,
      position: 'bottom',
      cssClass: 'toast',
    });
    (await toast).present();
    this.router.navigate(['/home', this.data]);
  }

  async openCart() {
    const modal = this.modalCtrl.create({
      component: CartPage,
      cssClass: 'cart-modal'
    });
    (await modal).present();
  }

  getProduct() {
    // tslint:disable-next-line: radix
    this.id = parseInt(this.actvtedRoute.snapshot.paramMap.get('id'));

    this.data = this.cartService.getProduct(this.id);
    console.log(this.data);
  }

  closePreview(data) {
    this.router.navigate(['/home', data]);
  }

  increment() {
    this.counter = this.counter += 1;
    // console.log(this.counter);
  }

  decrement() {
    if (this.counter > 0  ) {
      this.counter = this.counter -= 1;
      // console.log(this.counter);
    }
  }

  // amount() {
  //   return this.cart.reduce((a, b) => a + b.price * b.amount, 0);
  // }

  changeCounter(counter) {
    // tslint:disable-next-line: no-unused-expression
    counter.target.value;
  }

}
