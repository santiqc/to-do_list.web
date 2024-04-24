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
import { AlertService } from '../services/alertService';
import { RequestDTO } from '../model/requestDto';
import { ResponseDTO } from '../model/responseDto';
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
  actualizar: boolean = false;
  tarea!: Task | null;

  constructor(private service: TaskService, private fb: FormBuilder, private alertService: AlertService) {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.maxLength(250)]],
      dueDate: [''],
      status: ['', [Validators.required]]
    });

    this.getListTask();
  }

  ngOnInit(): void { }


  getListTask() {
    this.service.getTasks().subscribe({
      next: (value: Pageable) => {
        this.dataSource = new MatTableDataSource<Task>(value.content);
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        this.alertService.mensajeError(err.mensaje);
      },
    })
  }
  saveUpdateTask(): void {
    if (this.actualizar) {
      this.updateTask(this.tarea!)
      return;
    }

    this.saveTask();
  }

  saveTask() {
    const formValues = this.form.getRawValue();
    const data: Task = {
      title: formValues.title,
      description: formValues.description,
      dueDate: formValues.dueDate,
      status: formValues.status
    };

    this.service.saveTask(data).subscribe({
      next: (value) => {
        this.alertService.mensajeExito(value.mensaje);
        this.clearData();
        this.getListTask();
      },
      error: (err) => {
        this.alertService.mensajeError(err.mensaje);

      },
    });

  }



  previousUpdateTask(element: Task): void {
    this.actualizar = true;
    this.tarea = element;
    this.form.get('title')?.setValue(element.title);
    this.form.get('description')?.setValue(element.description);
    this.form.get('dueDate')?.setValue(element.dueDate);
    this.form.get('status')?.setValue(element.status);
  }

  updateTask(element: Task): void {
    const formValues = this.form.getRawValue();
    const data: RequestDTO = {
      title: formValues.title,
      description: formValues.description,
      dueDate: formValues.dueDate,
      status: formValues.status
    };

    this.service.updateTask(element.id!, data).subscribe({
      next: (value: ResponseDTO) => {
        this.alertService.mensajeExito(value.mensaje);
        this.clearData();
        this.getListTask();
      },
      error: (err) => {
        this.alertService.mensajeError(err.mensaje);

      },
    });
  }

  deleteTask(element: number): void {
    this.alertService.mensajeConfirmacion('Estas seguro de eliminar la tarea?')
      .then((result) => {
        if (result.isConfirmed) {
          this.service.deleteTask(element).subscribe(
            {
              next: (value: ResponseDTO) => {
                this.alertService.mensajeExito(value.mensaje);
                this.clearData();
                this.getListTask();
              },
              error: (err) => {
                this.alertService.mensajeError(err.mensaje);

              },
            }
          )
        }
      });


  }


  clearData(): void {
    this.actualizar = false;
    this.tarea = null;
    this.form.reset();
  }

}
