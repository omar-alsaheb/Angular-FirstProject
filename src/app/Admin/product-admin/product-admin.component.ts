import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/models/product';
import { ShopService } from 'src/app/service/shop.service';

@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.css'],
})
export class ProductAdminComponent implements OnInit {
  productId: number;
  constructor(private _shopService: ShopService, private router: Router) {}

  product: IProduct[];
  searchTerm: any;

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts() {
    this._shopService.getProducts().subscribe(
      (response: IProduct[]) => {
        this.product = response;
        console.log(this.product);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  removeItem(productId: IProduct) {
    this._shopService.deleteProductFromAdmin(productId.id).subscribe(
      (response) => {
        console.log(response);
        this.router.navigateByUrl('/shop');
      },
      (error) => {
        console.log(error);
      }
    );
    console.log(productId.id);
    this.getProducts();
  }
}
