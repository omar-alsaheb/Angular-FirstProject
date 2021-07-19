import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Basket } from '../models/basket';
import { IUser } from '../models/user';
import { AccountService } from '../service/account.service';
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

  currentUser$:Observable<IUser>
  constructor(private _SearchService: SearchService,private basketService:BasketService,private accountService:AccountService) {}



  ngOnInit(): void {
    // this._SearchService.onSearch();
    // this._SearchService.getProducts();
    this.basket$ = this.basketService.basket$;
    this.currentUser$ = this.accountService.currentUserSource$;

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
  logut(){
    this.accountService.logout();
  }
}
