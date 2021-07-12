import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../models/product';
import { BasketService } from '../service/basket.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  selectedItem: number;

  @Input() productItem: IProduct;

  constructor(private _basketService:BasketService) {}

  ngOnInit(): void {

  }

  onAddToCart(){
    this._basketService.onAddItemToCart(this.productItem);
  }
  // onclick(productId:number){
  //  this.selectedItem=productId;
  //  alert(this.selectedItem)
  // }
}
