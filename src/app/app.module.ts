import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EventChildComponent } from './components/event-child/event-child.component';
import { EventParentComponent } from './components/event-parent/event-parent.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EventChildComponent,
    EventParentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
