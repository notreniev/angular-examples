import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventParentComponent } from './components/event-parent/event-parent.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'parent', component: EventParentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
