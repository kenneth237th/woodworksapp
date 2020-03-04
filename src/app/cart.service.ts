import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  price: number;
  amount: number;
  img: string;
  detail: string;
  stock: string;
  dimension: string;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  data: Product[] = [
    { id: 0, name: 'Napture 3 Seater', price: 5000, amount: 1, img: '../assets/img/Seater1.png', detail: 'Lorem ipsum dolor sit amet,',
    stock: '100', dimension: '26 x 36 x 42', category: 'sofa'},
    { id: 1, name: 'Napture 2 Seater', price: 5000, amount: 1, img: '/assets/img/Seater4.png', detail: 'Lorem ipsum dolor sit amet',
    stock: '100',  dimension: '26 x 36 x 42', category: 'sofa'},
    { id: 2, name: 'Sofa Cum Bed', price: 10000, amount: 1, img: '/assets/img/modern-design.png', detail: 'Lorem ipsum dolor sit amet',
    stock: '100',  dimension: '26 x 36 x 42', category: 'bed'},
    { id: 3, name: 'Dask Chair', price: 2500, amount: 1, img: '/assets/img/chair1.png', detail: 'Lorem ipsum dolor sit amet',
    stock: '100',  dimension: '26 x 36 x 42', category: 'chair'},
    { id: 5, name: 'Harlinton Chest', price: 2900, amount: 1, img: '/assets/img/drawer3.png', detail: 'Lorem ipsum dolor sit amet',
    stock: '100',  dimension: '26 x 36 x 42', category: 'drawer'},
    { id: 6, name: 'Harlinton Dresser', price: 4500, amount: 1, img: '/assets/img/drawer2.png', detail: 'Lorem ipsum dolor sit amet',
    stock: '100',  dimension: '26 x 36 x 42', category: 'drawer'},
    { id: 7, name: 'Basel Chair', price: 1500, amount: 1, img: '/assets/img/chair2.png', detail: 'Lorem ipsum dolor sit amet',
    stock: '100',  dimension: '26 x 36 x 42', category: 'chair'},
    { id: 8, name: 'Office Chair', price: 2150, amount: 1, img: '/assets/img/chair3.png', detail: 'Lorem ipsum dolor sit amet',
    stock: '100', dimension: '26 x 36 x 42', category: 'chair'}
  ];

  private cart = [];
  private cartItemCount = new BehaviorSubject(0);

  constructor() { }

  getProducts() {
    return this.data;
  }

  getProduct(id: number) {
    return this.data.find(prod => {
      return prod.id === id;
      // console.log(prod.id === id);
    });
  }

  getCart() {
    return this.cart;
  }

  getCartItem() {
    return this.cartItemCount;
  }

  addProduct(product: { id: any; }) {
    let added = false;
    for (const p of this.cart) {
      if (p.id === product.id) {
        p.amount += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      this.cart.push(product);
    }
    this.cartItemCount.next(this.cartItemCount.value + 1);
  }

  descreaseProduct(product: { id: any; }) {
    for (const [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        p.amount -= 1;
        if (p.amount === 0) {
          this.cart.splice(index, 1);
        }
      }
    }
    this.cartItemCount.next(this.cartItemCount.value - 1);
  }

  removeProduct(product: { id: any; }) {
    for (const [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        this.cartItemCount.next(this.cartItemCount.value - p.amount);
        this.cart.splice(index, 1);
      }
    }
  }
}
