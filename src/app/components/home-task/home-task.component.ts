import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Pageable } from '../model/task';

@Component({
  selector: 'app-home-task',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './home-task.component.html',
  styleUrl: './home-task.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomeTaskComponent implements OnInit {


  constructor(private service: TaskService) {
    this.service.getTasks().subscribe({
      next: (value: Pageable) => {
        console.log(value.content);

      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  ngOnInit(): void { }

}
