import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../product.service';
import { IProduct } from '../iProduct';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {

  product: any = "";

  id: number = 3;
  name: string =  "";
  manufacturer: string ="";
  price: number =  0;

  
  constructor(private router: Router, private _productService: ProductsService) { }

  ngOnInit() {
    this.id = Number(this.router.url.substring(this.router.url.lastIndexOf('/') + 1));
    console.log(this.id);

    this.getProductsById(this.id)
  }

  getProductsById(id: number): void {

    this._productService.getProductsById(id).subscribe(
      {
        next:
          data => (
            this.id = data.id,
            this.name = data.name,
            this.manufacturer = data.manufacturer,
            this.price = data.price
          ),

        error: (err: any) => {
          if (err.status == 0) {
            console.log("Nem elérhető a szerver");
          } else if (err.status == 500) {
            console.log("Nincs ilyen ID");
          }
        }
      }
    );
  }

  addProduct() {
    let product: IProduct = { id: 0, name: this.name, manufacturer: this.manufacturer, price: this.price };
    this._productService.postProduct(product).subscribe();
    setTimeout(() => { window.location.replace("http://localhost:4200/") },1000);
  }

  updateProduct(id: number) { 
    let product: IProduct = { id: id, name: this.name, manufacturer: this.manufacturer, price: this.price };
    this._productService.editProduct(id, product).subscribe();
    setTimeout(() => { window.location.replace("http://localhost:4200/") }, 1000);
  }









}
