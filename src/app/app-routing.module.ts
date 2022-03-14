import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangeDetectionComponent } from './components/change-detection/change-detection.component';
import { EventParentComponent } from './components/event-parent/event-parent.component';
import { InputAutocompleteComponent } from './components/input-autocomplete/input-autocomplete.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'parent', component: EventParentComponent },
  { path: 'autocomplete', component: InputAutocompleteComponent },
  { path: 'change-detection', component: ChangeDetectionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
