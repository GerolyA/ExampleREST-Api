import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IProduct } from "./iProduct";
import { Observable, catchError } from "rxjs";

@Injectable()
export class ProductsService { 

    private baseUrl: string = 'https://localhost:7084/api/Products/'

    constructor(private http:HttpClient) {}

    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.baseUrl);
    }

    getProductsById(id:number): Observable<IProduct> {
        return this.http.get<IProduct>(this.baseUrl+id);
    }

    postProduct(product: IProduct){ 
        return this.http.post(this.baseUrl, product);
    }

    deleteProduct(id: number) {
        return this.http.delete(this.baseUrl + id);
    }

    editProduct(id: number, product: IProduct) { 
        return this.http.put(this.baseUrl + id, product);
    }

}
