import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewChild, type OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Pageable, Task } from '../model/task';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
@Component({
  selector: 'app-home-task',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule
  ],
  templateUrl: './home-task.component.html',
  styleUrl: './home-task.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomeTaskComponent implements OnInit {

  status: any[] = [
    { value: 'P', viewValue: 'Pendiente' },
    { value: 'C', viewValue: 'Completada' },
  ];

  form: FormGroup;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  displayedColumns: string[] = ['title', 'description', 'dueDate', 'status', 'action'];
  dataSource: any;

  constructor(private service: TaskService, private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required, Validators.maxLength(250)]],
      fechaVencimiento: ['', [Validators.required]],
      status: ['', [Validators.required]]

    });

    this.getListTask();
  }

  ngOnInit(): void { }


  getListTask() {
    this.service.getTasks().subscribe({
      next: (value: Pageable) => {
        console.log(value.content);
        this.dataSource = new MatTableDataSource<Task>(value.content);
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);

      }
    })
  }

}
