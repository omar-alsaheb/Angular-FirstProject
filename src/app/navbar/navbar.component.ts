import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Basket } from '../models/basket';
import { BasketService } from '../service/basket.service';
import { SearchService } from '../service/search.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  searchResciver: any;
  basket$:Observable<Basket>;
  constructor(private _SearchService: SearchService,private basketService:BasketService) {}



  ngOnInit(): void {
    // this._SearchService.onSearch();
    // this._SearchService.getProducts();
    this.basket$ = this.basketService.basket$;

  }

  onSearch1() {
    // this._SearchService.search1.subscribe((data: any) => {
    //   this.searchResciver = data;
    //   console.log(this.searchResciver);
    // });

    // this.shopCpm.onSearch();

    // this._SearchService.getProducts();
    // this._SearchService.alertmes();
  }
}
