import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventParentComponent } from './components/event-parent/event-parent.component';
import { InputAutocompleteComponent } from './components/input-autocomplete/input-autocomplete.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'parent', component: EventParentComponent },
  { path: 'family', component: InputAutocompleteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
