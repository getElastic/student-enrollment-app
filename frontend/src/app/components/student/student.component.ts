import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, PageEvent } from '@angular/material';
import { Student } from '../../models/student';
import { StudentService } from '../../services/student.service';
import { StudentDialogComponent } from '../dialogs/student-dialog/student-dialog.component';
import { Course } from '../../models/Course';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {


  displayedColumns = ['id', 'firstName', 'lastName', 'indexNumber', 'actions'];
  dataSource: MatTableDataSource<Student>;
  filter = "*";

  @Input() selectedCourse: Course;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public studentService: StudentService, public dialog: MatDialog) { }

  ngOnInit() {
    this.loadData();
    this.paginator.pageSize = 10
  }

  ngOnChanges() {
    if (this.selectedCourse.id) {
      this.paginator.pageIndex = 0;
      this.loadData();
    }
  }

  public loadData() {
    if (this.selectedCourse) {
        this.studentService.getStudentsForCourse(this.selectedCourse.id).subscribe(data => {
        this.dataSource = new MatTableDataSource(data['content']);
        this.paginator.length = data['totalElements'];
        this.dataSource.sort = this.sort;
      });
    }
  }

  getNext(event: PageEvent) {
    this.loadData();
  }

 


}