import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  @Input() recebeFamilia;
  @Output() respostaFamilia = new EventEmitter();
  familia: any[];
  whoAmI = 'I am Detail';
  show: boolean = false;

  @Output() notifyParent: EventEmitter<any> = new EventEmitter();


  constructor() {
    this.familia = [
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
    this.notifyParent.emit(`Pai, te mandei um clique!! ${f.nome} ${f.sobreNome}`);
  }

  ngOnInit(): void {
    console.log('Who am I? ', this.whoAmI, 'recebi filhos ');
  }

}
