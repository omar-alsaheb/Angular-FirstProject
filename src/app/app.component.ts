import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BasketService } from './service/basket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  constructor(private basketService:BasketService){}
  ngOnInit(): void {
    const basketId= localStorage.getItem('basket_Id')
    console.log(basketId)
    this.basketService.getBasket(basketId).subscribe(()=>{
     
    },
    error=>{
      console.log(error)
    });
  }

}
