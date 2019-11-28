import { Injectable } from '@angular/core';
import { Produtos } from "../produtos";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';



@Injectable()
export class AnunciarService {

  /* produtos = produtos;
 
   constructor() { }
   
   getProdutos() :any{
     return this.produtos;
   }
 
   saveProdutos(form:any){
     this.produtos.push(form);
   }
   */

  // Define API
  apiURL = '/api';

  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // HttpClient API get() method => Fetch Products list
  getProdutos(): Observable<Produtos[]> {
    return this.http.get<Produtos[]>(this.apiURL + '/anuncio/lista')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  // HttpClient API post() method => Create product
  criarProduto(produto): Observable<Number> {
    return this.http.post<Number>(this.apiURL + '/anuncio', JSON.stringify(produto), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  // HttpClient API put() method => Update product
  updateProduto(id, produto): Observable<Produtos> {
    return this.http.put<Produtos>(this.apiURL + '/produto/update' + id, JSON.stringify(produto), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  // HttpClient API delete() method => Delete product
  deleteProduto(id) {
    return this.http.delete<Produtos>(this.apiURL + '/produto/deletar' + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  // Error handling
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
