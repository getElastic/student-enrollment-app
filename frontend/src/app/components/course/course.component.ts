import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, PageEvent } from '@angular/material';
import { Course } from '../../models/Course';
import { CourseService } from '../../services/course.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  template: `
    <nav class='navbar navbar-expand navbar-light bg-light'>
        <a class='navbar-brand'>{{pageTitle}}</a>
        <ul class='nav nav-pills'>
          <li><a class='nav-link' routerLinkActive='active' [routerLink]="['/course']">List of Unique Subjects</a></li>
        </ul>
    </nav>
    <div class='container'>
      <router-outlet></router-outlet>
    </div>
    `,
})
export class CourseComponent implements OnInit {

  displayedColumns = ['id', 'label', 'name', 'startDate'];
  dataSource: MatTableDataSource<Course>;
  filter = "*";
  selectedCourse: Course;
  errorMessage: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isShown: boolean;

  courses: Course[];
  constructor(public courseService: CourseService, public dialog: MatDialog) { }

  ngOnInit(): void {

    console.log('on initialization');
    this.courseService.getAllCourses().subscribe(
      courses => {
        this.courses = courses;
      },
      error => this.errorMessage = <any>error
    );
  }

  public loadData() {
    this.courseService.getAllCourses().subscribe(data => {
      this.dataSource = new MatTableDataSource(data['content']);
      this.paginator.length = data['totalElements'];
      this.dataSource.sort = this.sort;
    });
  }

  getNext(event: PageEvent) {
    this.loadData();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    if (filterValue.length == 0) // kada se polje za pretragu obriše učitaj sve
      filterValue = "*";

    this.courseService.getAllCourses().subscribe(data => {
      this.dataSource = new MatTableDataSource(data['content']);
      this.paginator.length = data['totalElements']
    });
    this.filter = filterValue;
    this.paginator.pageIndex = 0;
  }

  public selectRow(row) {
    this.selectedCourse = row;
  }

  public sendRequest() {
    this.isShown = true;
  }
}