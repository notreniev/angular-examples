import { Component, OnInit } from '@angular/core';
import { fromEvent, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';

const getContinents = (keys: string) =>
  [
    'africa',
    'antarctica',
    'asia',
    'australia',
    'europe',
    'north america',
    'south america'
  ].filter(e => e.indexOf(keys.toLowerCase()) > -1);

const fakeContinentsRequest = keys =>
  of(getContinents(keys)).pipe(
    tap(_ => console.log(`API CALL at ${new Date()}`))
  );

@Component({
  selector: 'app-input-autocomplete',
  templateUrl: './input-autocomplete.component.html',
  styleUrls: ['./input-autocomplete.component.css']
})
export class InputAutocompleteComponent implements OnInit {

  constructor() {

  }

  fakeDataRequest = (keys: string) => of(getContinents(keys)).pipe(
    tap(() => console.log(`API call at ${new Date()}`))
  );

  ngOnInit(): void {
    fromEvent(document.getElementById('type-ahead'), 'keyup')
      .pipe(
        debounceTime(300),
        map((e): string => (e.target as HTMLInputElement).value),
        distinctUntilChanged(),
        switchMap(fakeContinentsRequest),
        tap(c => (document.getElementById('output').innerText = c.join('\n')))
      ).subscribe();
  }
}
