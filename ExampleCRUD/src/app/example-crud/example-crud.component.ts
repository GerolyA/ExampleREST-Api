import { Component, OnInit} from '@angular/core';
import { ProductsService } from '../product.service';
import { IProduct } from "../iProduct";


@Component({
  selector: 'app-example-crud',
  templateUrl: './example-crud.component.html',
  styleUrls: ['./example-crud.component.css']
})

export class ExampleCRUDComponent implements OnInit {

  public products: IProduct[] = [];


  constructor(private _productService: ProductsService) { }
  

  ngOnInit() { 
    this._productService.getProducts()
      .subscribe(data => this.products = data);
  }


  deleteProduct(id: number): void {
    this._productService.deleteProduct(id).subscribe();
    window.location.reload();
  }




}
