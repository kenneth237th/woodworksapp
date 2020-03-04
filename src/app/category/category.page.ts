import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  cart = [];
  cartItemCount: BehaviorSubject<number>;
  constructor(
    private router: Router,
    private cartService: CartService,
  ) { }

  ngOnInit() {
    this.cart = this.cartService.getCart();
    this.cartItemCount = this.cartService.getCartItem();
  }

  openCart() {
    this.router.navigate(['/cart']);
  }

}
