import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IBrands } from '../models/brands';
import { ICategory } from '../models/category';
import { IProduct } from '../models/product';
import { ShopService } from './shop.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private _shopService: ShopService) {}
  private searchService = new BehaviorSubject(null);
  search1 = this.searchService.asObservable();

  // products: IProduct[];
  // category: ICategory[];
  // brands: IBrands[];
  // productCount: number;
  // selectedBrand = 0;
  // selectedCategory = 0;
  // productCondition = false;
  // searchTerm: any;
  // @ViewChild('search1') search: ElementRef;

  // private searchService = new BehaviorSubject(null);
  // search1 = this.searchService.asObservable();

  // getProducts() {
  //   this._shopService
  //     .getProducts(this.searchTerm, this.selectedBrand, this.selectedCategory)
  //     .subscribe(
  //       (response: IProduct[]) => {
  //         this.products = response;
  //         this.productCount = this.products.length;
  //         console.log(this.products)
  //         if (this.productCount == 0) {
  //           this.productCondition = true;
  //         }
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  // }

  // onSearch() {
  //   // this.searchTerm = this.search.nativeElement.value;
  //   this.searchTerm = "omar"
  //   this.getProducts();
  //   this.searchTerm = '';
  // }

  // alertmes(){
  //   alert("Hello")
  // }

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
    this.searchTerm = 'omar';
    this.getProducts();
    // console.log(this.products[0].name.toLowerCase().includes(this.searchTerm.toLowerCase()));

    // console.log(this.products.length);
    this.searchTerm = '';
    // this.dataFromShop.emit(this.onSearch());
    alert("asdas")
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
