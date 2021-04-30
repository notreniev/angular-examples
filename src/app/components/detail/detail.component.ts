import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  @Input() recebeFamilia;
  @Output() respostaFamilia = new EventEmitter();
  whoAmI = 'I am Detail';

  @Output() notifyParent: EventEmitter<any> = new EventEmitter();

  sendNotification() {
    this.notifyParent.emit('Some value to send to the parent');
  }

  constructor() { }

  ngOnInit(): void {
    console.log('Who am I? ', this.whoAmI, 'recebi família ');
  }

}
