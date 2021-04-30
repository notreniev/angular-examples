import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {

  familia: any[];
  whoAmI = 'I am Master';
  show: boolean = false;

  constructor() {
    this.familia = [
      {
        nome: 'Everton',
        sobreNome: 'Canez'
      },
      {
        nome: 'Luciano',
        sobreNome: 'Canez'
      },
      {
        nome: 'Daniel',
        sobreNome: 'Canez!'
      }
    ];
  }

  receiverFeedback(respostaFilho) {
    console.log('Foi emitido o evento e chegou no pai >>>> ', respostaFilho);
  }

  ngOnInit(): void { }

  getNotification(evt) {
    // Do something with the notification (evt) sent by the child!
    this.show = true;
    console.log('filho notificou o pai: ', evt);
    console.log('Who am I? ', this.whoAmI, 'família no master: ', this.familia);
  }

}
