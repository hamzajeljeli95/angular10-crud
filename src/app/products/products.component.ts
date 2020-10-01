import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {Product} from '../product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  displayedColumns: string[] = ['prod_name', 'prod_price'];
  data: Product[] = [];
  isLoadingResults = true;

  constructor(private api: ApiService) {
  }

  // Call made when page is loaded.
  ngOnInit(): void {
    this.api.getProducts().subscribe((result: Product[]) => {
      this.data = result;
      console.log(this.data);
      this.isLoadingResults = false;
    }, error => {
      console.log(error);
      this.isLoadingResults = false;
    });
  }

}
