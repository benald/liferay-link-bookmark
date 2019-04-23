import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Link } from '../shared/link';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class RestApiService {

  // Define API
  // apiURL = '/p13n-ws';
  apiURL = 'http://localhost:3000';
  pageUUid = "/user-links/ikon/";

  constructor(private http: HttpClient) { }

  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // user-links?linkUUid=42213618
  
  // Check if page has been bookmarked
  // HttpClient API get() method => Fetch link
  getBookmark(linkUUid): Observable<Link> {
    console.log(this.apiURL + this.pageUUid + linkUUid);
    return this.http.get<Link>(this.apiURL + this.pageUUid + linkUUid)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  createBookmark(link): Observable<Link> {
    return this.http.post<Link>(this.apiURL + '/user-links', JSON.stringify(link), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
  
  // If page has been bookmarked and button is clicked delete bookmark 
  // HttpClient API delete() method => Delete link
  deleteBookmark(id) {
    return this.http.delete<Link>(this.apiURL + '/user-links/' + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
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
