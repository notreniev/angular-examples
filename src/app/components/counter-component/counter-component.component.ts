import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-counter',
  templateUrl: './counter-component.component.html',
  styleUrls: ['./counter-component.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent implements OnInit {
  @Input() data$: Observable<any>;
  data;

  constructor(private changeDetection: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.data$.subscribe((value) => {
      this.data = value;
      this.changeDetection.markForCheck()
    })
  }

}
