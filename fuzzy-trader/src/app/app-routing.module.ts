import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home-component', component: HomeComponent },
  { path: '', redirectTo: '/home-component', pathMatch: 'full' },
  { path: '**', redirectTo: '/home-component'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
