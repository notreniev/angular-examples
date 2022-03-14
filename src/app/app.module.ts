import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EventChildComponent } from './components/event-child/event-child.component';
import { EventParentComponent } from './components/event-parent/event-parent.component';
import { InputAutocompleteComponent } from './components/input-autocomplete/input-autocomplete.component';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from './components/modal/modal.component';
import { CounterComponent } from './components/counter-component/counter-component.component';
import { ChangeDetectionComponent } from './components/change-detection/change-detection.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EventChildComponent,
    EventParentComponent,
    InputAutocompleteComponent,
    ModalComponent,
    ChangeDetectionComponent,
    CounterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
