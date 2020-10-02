import {Injectable} from '@angular/core';

// Importing API Related dependancies
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {Product} from './product';

// Defining HttpHeaders & apiUrl
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

// Endpoint (Consider changing it)
const apiUrl = 'http://localhost:7071/api/products';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(apiUrl)
      .pipe(
        tap(product => console.log('fetched products')),
        catchError(this.handleError('getProducts', []))
      );
  }

  getProduct(id: number): Observable<Product> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Product>(url).pipe(
      tap(_ => console.log(`fetched product id=${id}`)),
      catchError(this.handleError<Product>(`getProduct id=${id}`))
    );
  }

  addProduct(product: Product): Observable<Product> {
    console.log('pushing ...');
    console.log(product);
    return this.http.post<Product>(apiUrl, product, httpOptions).pipe(
      tap((prod: any) => console.log(`added product w/ id= ${prod._id}`)),
      catchError(this.handleError<Product>('addProduct'))
    );
  }

  updateProduct(id: any, product: Product): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, product, httpOptions).pipe(
      tap(_ => console.log(`updated product w/ id= ${id}`)),
      catchError(this.handleError<Product>('updateProduct'))
    );
  }

  deleteProduct(id: any): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete(url, httpOptions).pipe(
      tap(_ => console.log(`deleted product w/ id= ${id}`)),
      catchError(this.handleError<Product>('deleteProduct'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
