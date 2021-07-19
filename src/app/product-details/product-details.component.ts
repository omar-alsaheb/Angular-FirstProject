import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../models/product';
import { ShopService } from '../service/shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private _shopService: ShopService,
    private route: ActivatedRoute
  ) {}
  onLoadPost: any;
  checkPost=true;

  ngOnInit(): void {
    this.onLoadProduct();

    // +this.route.snapshot.paramMap.get('id')
  }

  onLoadProduct() {
    this._shopService.getProductId(this.route.snapshot.params['id']).subscribe(
      (response: IProduct) => {
        this.onLoadPost = response;
        if(response == null){
          this.checkPost = false;
        }
        // console.log(response)
      },

      (error) => {
        console.log(error);
      }
    );
  }
}
