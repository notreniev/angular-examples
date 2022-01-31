import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-event-child',
  templateUrl: './event-child.component.html',
  styleUrls: ['./event-child.component.css']
})
export class EventChildComponent implements OnInit {
  @Input() children = [];
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();

  whoAmI = 'I am the son';
  show: boolean = false;

  constructor() {
    this.children = [
      {
        nome: 'Everton',
        sobreNome: 'Silva'
      },
      {
        nome: 'Luciano',
        sobreNome: 'Silva'
      },
      {
        nome: 'Daniel',
        sobreNome: 'Silva'
      }
    ];
  }

  sendNotification(f) {
    this.notifyParent.emit(`${f.nome} ${f.sobreNome}`);
  }

  ngOnInit(): void {
  }

}
