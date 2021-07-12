import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Basket, IBasket, ItemBasket } from '../models/basket';
import { map } from 'rxjs/operators';
import { IProduct } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  baseUrl = 'https://localhost:44379/api/';
  private basketSource = new BehaviorSubject<IBasket>(null);
  // private basketSource = new BehaviorSubject<any>(null);
  basket$ = this.basketSource.asObservable();
  constructor(private http: HttpClient) {}

  getBasket(id: string) {
    return this.http.get(this.baseUrl + 'Bakset?Id=' + id).pipe(
      map((response: any) => {
        this.basketSource.next(response);
      })
    );
  }

  setBasket(basket: IBasket) {
    
    return this.http.post<IBasket>(this.baseUrl + 'Basket', basket).subscribe(
      (response: IBasket) => {
        this.basketSource.next(response);
        
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getCurrentBasketValue() {
    return this.basketSource.value;
  }

  onAddItemToCart(item: IProduct, quantity = 1) {
    const itemToAdd: ItemBasket = this.mapProductToBasketItem(item);
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.addOrUpdateBasketItem(
      basket.items,
      itemToAdd,
      quantity
    );
    console.log(basket);
    this.setBasket(basket);
  }
  addOrUpdateBasketItem(
    items: ItemBasket[],
    itemToAdd: ItemBasket,
    quantity: number
  ): ItemBasket[] {
    const index = items.findIndex((x) => x.id === itemToAdd.id);
    if (index === -1) {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    } else {
      items[index].quantity += quantity;
    }
    return items;
  }
  createBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basket_Id', basket.id);
    return basket;
  }
  mapProductToBasketItem(item: IProduct): ItemBasket {
    return {
      id: item.id,
      productName: item.name,
      productBrand: item.productBrand,
      productCategory: item.productCategory,
      price: item.price,
      quantity: 1,
      pictureUrl: item.pictureUrl,
    };
  }
}
