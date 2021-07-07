import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBrands } from '../models/brands';
import { ICategory } from '../models/category';
import { IProduct } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  constructor(private http: HttpClient) {}

  baseUrl = 'https://localhost:44379/api/';

  getProducts(search: string, brandId?: number, categoryId?: number) {
    let params = new HttpParams();
    if (search) {
      params = params.append('searchTerm', search);
    }

    if (brandId) {
      params = params.append('brandId', brandId.toString());
    }

    if (categoryId) {
      params = params.append('categoryId', categoryId.toString());
    }

    return this.http.get<IProduct[]>(this.baseUrl + 'Product', { params });
  }
  getProductId(id:number){
    return this.http.get<IProduct>(this.baseUrl + 'Product/Product/'+id);


  }
  getCategory() {
    return this.http.get<ICategory[]>(this.baseUrl + 'Product/Category');
  }
  getBrands() {
    return this.http.get<IBrands[]>(this.baseUrl + 'Product/Brands');
  }
}
