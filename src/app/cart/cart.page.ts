import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Product, CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {


  cart: Product[] = [];
  price: 0;
  amount: 0;

  categories = ['Order', 'Order History'];

  constructor(private modalController: ModalController, private alertCtrl: AlertController, private cartService: CartService) { }

  ngOnInit() {

    this.cart = this.cartService.getCart();

  }

  decreaseCartItem(product) {
    this.cartService.descreaseProduct(product);
  }

  increaseCartItem(product) {
    this.cartService.addProduct(product);
  }

  removeCartItem(product) {
    this.cartService.removeProduct(product);
  }

  getTotal() {
    return this.cart.reduce((i, j) => i + j.price * j.amount, 0);
  }

  modalClose() {
    this.modalController.dismiss();
  }

  onCategoryChange(category){
    console.log(category.detail.value);
  }

  async checkout() {
    const alert = await this.alertCtrl.create({
      header: 'Thank for your Order!',
      message: 'We will deliver your purchase item as soon as possible',
      buttons: ['OK']
    });
    alert.present().then(() => {
    this.modalController.dismiss();
  });
  }
}


