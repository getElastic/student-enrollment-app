
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { Course } from '../models/course';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable()
export class CourseService {

    private readonly API_URL = 'http://localhost:8080/unique-subjects/';

    constructor(private httpClient: HttpClient) {

    }
    public getAllCourses(): Observable<Course[]> {
        console.log(this.API_URL )
        return this.httpClient.get<Course[]>(this.API_URL).pipe(
            catchError(this.handleError)
            );
    }
 
      private handleError(err: HttpErrorResponse) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          errorMessage = `An error occurred: ${err.error.message}`;
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
      }

}