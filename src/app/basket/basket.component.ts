import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Basket } from '../models/basket';
import { BasketService } from '../service/basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  basket$:Observable<Basket>;
  constructor(private _basketService:BasketService) { }

  ngOnInit(): void {
    this.basket$ = this._basketService.basket$;
  }

}
