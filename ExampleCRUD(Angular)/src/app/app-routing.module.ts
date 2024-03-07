import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExampleCRUDComponent } from './example-crud/example-crud.component';
import { ProductFormComponent } from './product-form/product-form.component';

const routes: Routes = [
  { path: 'ExampleCRUD', component: ExampleCRUDComponent },
  { path: 'ProductForm/:id', component: ProductFormComponent },
  { path: '', redirectTo: '/ExampleCRUD', pathMatch: 'full' },
  { path: '**', component: ExampleCRUDComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
