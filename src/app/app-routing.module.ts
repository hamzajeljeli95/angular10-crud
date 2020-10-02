import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
/* Importing from App.module.ts */
import {ProductsComponent} from './products/products.component';
import {ProductAddComponent} from './product-add/product-add.component';
import {ProductEditComponent} from './product-edit/product-edit.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';

/*
Defining the list of routes
*/
const routes: Routes = [{
  path: 'products',
  component: ProductsComponent,
  data: {title: 'List of products'}
},
  {
    path: 'product-details/:id',
    component: ProductDetailComponent,
    data: {title: 'List of products'}
  },
  {
    path: 'product-add',
    component: ProductAddComponent,
    data: {title: 'Add product'}
  },
  {
    path: 'product-edit/:id',
    component: ProductEditComponent,
    data: {title: 'Edit product'}
  },
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full'
  },
];

/*
END.
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
