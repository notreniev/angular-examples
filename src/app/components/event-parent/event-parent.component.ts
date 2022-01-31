import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-parent',
  templateUrl: './event-parent.component.html',
  styleUrls: ['./event-parent.component.css']
})
export class EventParentComponent implements OnInit {
  show: boolean = false;
  children = [];
  child = "";

  constructor() { }

  ngOnInit(): void {
  }

  getNotificationFromChild(child: string) {
    this.show = true;
    this.child = child;
    this.children.push(this.child);
  }

}
