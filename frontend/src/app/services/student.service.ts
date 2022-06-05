
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import { Student } from '../models/student';

@Injectable()
export class StudentService {

    private readonly API_URL = 'http://localhost:8765/list-unique-students/';

    constructor(private httpClient: HttpClient) {

    }
    public getStudentsForCourse(courseId: number): Observable<Student[]> {
        console.log(this.API_URL + '?courseId=' + courseId)
        return this.httpClient.get<Student[]>(this.API_URL + '?courseId=' + courseId);
    }

}