import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'task',
        loadComponent: () => import('./components/home-task/home-task.component'),
    },
    {
        path: '**',
        redirectTo: 'task',
        pathMatch: 'full'
    }
];

