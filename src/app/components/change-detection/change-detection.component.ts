import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-change-detection',
  templateUrl: './change-detection.component.html',
  styleUrls: ['./change-detection.component.css'],
})
export class ChangeDetectionComponent implements OnInit {
  counter: number = 0;
  data$ = new BehaviorSubject({ counter: 0 })
  constructor() { }

  ngOnInit(): void {
  }

  increment() {
    this.data$.next({ counter: ++this.counter })
  }

}
