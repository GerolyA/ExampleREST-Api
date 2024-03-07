import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../product.service';
import { IProduct } from '../iProduct';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements DoCheck, OnInit {

  product: any = "";
  id: number = 3;
  name: string = "";
  manufacturer: string = "";
  price: number = 0;
  errorMessage: string = "";

  constructor(private fb: FormBuilder, private router: Router, private _productService: ProductsService) { }

  ngOnInit() {
    this.id = Number(this.router.url.substring(this.router.url.lastIndexOf('/') + 1));
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

  addProduct() {
    let product: IProduct = { id: 0, name: this.name, manufacturer: this.manufacturer, price: this.price };
    this._productService.postProduct(product).subscribe(
      {
        next: () => setTimeout(() => { window.location.replace("http://localhost:4200/") }, 1000),
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

  updateProduct(id: number) {
    let product: IProduct = { id: id, name: this.name, manufacturer: this.manufacturer, price: this.price };
    this._productService.editProduct(id, product).subscribe(
      {
        next: () => setTimeout(() => { window.location.replace("http://localhost:4200/") }, 1000),
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
    setTimeout(() => { window.location.replace("http://localhost:4200/") }, 1000);
  }

  disabled = true;
  ngDoCheck(): void {
    this.disabled = this.productForm.status == "INVALID" ? true : false;
    console.log(this.productForm.status);
  }

  productForm = this.fb.group({
    name: ['', Validators.required],
    manufacturer: ['', Validators.required],
    price: ['', Validators.required,],
  });
}
