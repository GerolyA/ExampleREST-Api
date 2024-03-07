import { HttpClient } from "@angular/common/http";
import { ProductsService } from "./product.service";
import { TestBed } from "@angular/core/testing";
import {HttpClientTestingModule } from "@angular/common/http/testing";
import { of } from "rxjs";

describe("ProductService", () => {
    let service: ProductsService;
    let httpClientSpy: jasmine.SpyObj<HttpClient>;
    let PRODUCTS =
        [
        {
            "id": 2,
            "name": "Tylenol",
            "manufacturer": "Johnson & Johnson",
            "price": 1850
        },
        {
            "id": 3,
            "name": "Advil",
            "manufacturer": "Pfizer",
            "price": 1720
        },
        {
            "id": 4,
            "name": "Zyrtec",
            "manufacturer": "Johnson & Johnson",
            "price": 3900
        }
    ]

    beforeEach(() => {
        TestBed.configureTestingModule({ 
            imports: [HttpClientTestingModule]
        });
        httpClientSpy = jasmine.createSpyObj('httpClient', ['get']);
        service = new ProductsService(httpClientSpy);
    });

    it("should created", () => {
            expect(service).toBeTruthy();
    });

    it("should get all products", () => {
        httpClientSpy.get.and.returnValue(of(PRODUCTS));
        service.getProducts().subscribe(
            products => {
                expect(products).toBeTruthy();
                expect(products.length).toBe(3);
            }
        );
    });
});