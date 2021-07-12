import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Basket, ItemBasket } from '../models/basket';
import { BasketService } from '../service/basket.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  basket$: Observable<Basket>;
  constructor(private _basketService: BasketService) {}

  ngOnInit(): void {
    this.basket$ = this._basketService.basket$;
    console.log(this.basket$);
  }

  removeBasketItem(item: ItemBasket) {
    this._basketService.removeItemFromCart(item);
  }
}
