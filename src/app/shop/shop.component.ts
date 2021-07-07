import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrands } from '../models/brands';
import { ICategory } from '../models/category';
import { IProduct } from '../models/product';
import { ShopService } from '../service/shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  constructor(private _shopService: ShopService) {}
  products: IProduct[];
  category: ICategory[];
  brands: IBrands[];
  productCount: number;
  selectedCategory = 0;
  selectedBrand = 0;
  productCondition = false;
  searchTerm: any;
  @ViewChild('search') search: ElementRef;

  ngOnInit(): void {
    this.getProducts();
    this.getCategory();
    this.getBrands();
  }

  onSelectedCategory(categoryId: number) {
    this.selectedCategory = categoryId;
    // alert(this.selectedCategory)
    this.getProducts();
    if (this.productCount == 0) {
      this.productCondition = false;
    }
  }

  onSelectedBradns(bradnId: number) {
    this.selectedBrand = bradnId;
    // alert(this.selectedBrand)
    this.getProducts();
    if (this.productCount == 0) {
      this.productCondition = false;
    }
  }
  getProducts() {
    this._shopService
      .getProducts(this.searchTerm, this.selectedBrand, this.selectedCategory)
      .subscribe(
        (response: IProduct[]) => {
          this.products = response;
          this.productCount = this.products.length;

          if (this.productCount == 0) {
            this.productCondition = true;
          }

          // console.log(this.selectedBrand,this.selectedCategory)
        },
        (error) => {
          console.log(error);
        }
      );
  }
  getCategory() {
    this._shopService.getCategory().subscribe(
      (response: ICategory[]) => {
        this.category = [{ id: 0, name: 'All' }, ...response];

        // console.log( this.products);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getBrands() {
    this._shopService.getBrands().subscribe(
      (response: IBrands[]) => {
        this.brands = [{ id: 0, name: 'All' }, ...response];

        // console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSearch() {
    this.searchTerm = this.search.nativeElement.value;
    this.getProducts();
    // console.log(this.products[0].name.toLowerCase().includes(this.searchTerm.toLowerCase()));

    // console.log(this.products.length);
    this.searchTerm = '';
  }

  onRest() {
    this.searchTerm = '';

    this.selectedCategory = 0;
    this.selectedBrand = 0;
    this.getProducts();
    this.productCondition = false;
  }
  onKeyEnter() {
    this.productCondition = false;
    this.onSearch();
    // this.onSearch();
  }
}
