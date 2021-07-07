import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductsService } from './service/products.service';
import { ShopService } from './service/shop.service';
import { ShopComponent } from './shop/shop.component';
import {HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { LoginComponent } from './login/login.component'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductItemComponent,
    ShopComponent,
    HomeComponent,
    ProductDetailsComponent,
    LoginComponent,   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule

  ],
  providers: [ShopService,ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
