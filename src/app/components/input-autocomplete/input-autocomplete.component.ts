import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { fromEvent, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, startWith, switchMap, tap } from 'rxjs/operators';
import countries from '../../../assets/data/countries.json';

const getCountries = (keys: string) => countries.filter(e => e.name.toLowerCase().startsWith(keys.toLowerCase()));

@Component({
  selector: 'app-input-autocomplete',
  templateUrl: './input-autocomplete.component.html',
  styleUrls: ['./input-autocomplete.component.css']
})
export class InputAutocompleteComponent implements OnInit {
  @ViewChild("output")
  public outputRef: ElementRef<HTMLElement>;

  public inputValue = "";

  constructor() { }

  ngOnInit(): void { }

  /**
   * Temporarily mocked data
   * 
   * @param keys 
   * @returns 
   */
  public fakeCountriesRequest(keys: string) {
    if (!keys || keys.length < 2) return of([]);
    return of(getCountries(keys)).pipe(
      tap(_ => getCountries(keys))
    );
  }

  /**
   * Input event listener to 
   * filter the results
   * 
   * @param event 
   */
  onkeyup(event: Event) {
    const ev = fromEvent(event.target, 'keyup');
    ev.pipe(
      debounceTime(200),
      map((e: Event): string => (e.target as HTMLInputElement).value),
      distinctUntilChanged(),
      switchMap(term => this.fakeCountriesRequest(term)),
      catchError((source) => source.pipe(startWith([])))
    ).subscribe(this.showResults);
  }

  public showResults(res: string[]): void {
    const output = document.getElementById('output');
    output.innerHTML = res.map((e: any) => `<li class="li">${e?.name}</li>`).join('');
  }

  @HostListener('click', ['$event.target'])
  public clicked(e?: HTMLInputElement) {
    if (!e.innerText) return;
    this.inputValue = e.innerText;
  }

}
