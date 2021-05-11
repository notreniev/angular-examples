import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {

  whoAmI = 'I am Master';
  show: boolean = false;

  constructor() {
  }

  ngOnInit(): void { }

  getNotification(evt) {
    // Do something with the notification (evt) sent by the child!
    this.show = true;
    console.info('recebi o filho: ', evt);
    this.whoAmI = evt;
  }

}
