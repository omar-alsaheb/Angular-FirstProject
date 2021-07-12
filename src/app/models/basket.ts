import {v4 as uuidv4} from 'uuid'
export interface IBasket{
    id:string;
    items:ItemBasket[];

}


export interface ItemBasket{
    id:number;
    productName:string;
    price:number;
    quantity:number;
    pictureUrl:string;
    productBrand:string;
    productCategory:string;
    }

    export class Basket implements IBasket{
        id=uuidv4();
        items: ItemBasket[]=[];

    }

