import { Component, OnInit} from '@angular/core';
import { ProductsService } from '../product.service';
import { IProduct } from "../iProduct";


@Component({
  selector: 'app-example-crud',
  templateUrl: './example-crud.component.html',
  styleUrls: ['./example-crud.component.css']
})

export class ExampleCRUDComponent implements OnInit {

  products: IProduct[] = [];
  errorMessage: string = "";

  constructor(private _productService: ProductsService) { }
  

  ngOnInit() {
    this._productService.getProducts()
      .subscribe(
        {
          next: (data) => this.products = data,
          error: (err: any) => {
            if (err.status == (0)) {
              this.errorMessage = "Nem elérhető a szerver";
            } else if (err.status == 500) {
              this.errorMessage = "Nincs ilyen ID";
            } else {
              this.errorMessage = "valami hiba történt";
            }
          }
        }
      )
  }

  deleteProduct(id: number): void {
    this._productService.deleteProduct(id).subscribe(
      {
        next: ()=> window.location.reload(),
        error: (err: any) => {
          if (err.status == (0)) {
            this.errorMessage = "Nem elérhető a szerver";
          } else if (err.status == 500) {
            this.errorMessage = "Nincs ilyen ID";
          } else {
            this.errorMessage = "valami hiba történt";
          }
        }
      }
    );
  }
}
