import { Component, OnInit } from '@angular/core';
import { getListOfItemMock } from '../examples/domain/mocks/item.mock';
import { ItemModel } from '../examples/domain/models/item.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'angular';

  constructor() { }

  ngOnInit(): void {
  }

}
