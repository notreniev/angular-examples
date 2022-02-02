import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable, of, Subscription } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, startWith, switchMap, tap } from 'rxjs/operators';
import countries from '../../../assets/data/countries.json';
import { ItemModel } from '../../domain/models/item.model';

@Component({
  selector: 'app-input-autocomplete',
  templateUrl: './input-autocomplete.component.html',
  styleUrls: ['./input-autocomplete.component.css']
})
export class InputAutocompleteComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("input") inputRef: ElementRef;
  @ViewChild("output") outputRef: ElementRef;
  public inputValue = "";
  public keyupSubscription: Subscription;
  public countries: ItemModel[] = [];
  public selected: ItemModel;

  constructor() { }


  public ngAfterViewInit(): void {
    this.filterCountriesFromInput();
  }

  public selectOption(event){
    console.log('selected', event.target.value, this.selected)
    this.inputValue = this.selected.name;
    this.countries = [];
  }

  public ngOnInit(): void { }

  /**
   * Starts to listen values from 
   * the users's input
   * 
   */
  public filterCountriesFromInput(): void {
    this.keyupSubscription = fromEvent(this.inputRef.nativeElement, 'keyup')
      .pipe(
        debounceTime(200),
        map((e: Event): string => (e.target as HTMLInputElement).value),
        distinctUntilChanged(),
        switchMap(term => this.fakeCountriesRequest(term)),
        catchError((source) => source.pipe(startWith([])))
      )
      .subscribe((data: ItemModel[]) => this.showResults(data));
  }

  public showResults(res: ItemModel[]): void {
    this.countries = res;
    this.outputRef.nativeElement.innerHTML = res
      .map((e: ItemModel) => `<li class="list-item" value="${e?.code}">${e?.name}</li>`).join('');
  }

  @HostListener('click', ['$event.target'])
  public clicked(elem?: HTMLElement): void {
    if (!elem.innerText) return;
    const selectedCode = elem.getAttribute('value');
    this.inputValue = elem.innerText;
    this.selected = {name: this.inputValue, code: selectedCode};
    this.outputRef.nativeElement.innerHTML = [];
    elem.innerText = "";
  }

  public ngOnDestroy(): void {
    this.keyupSubscription.unsubscribe();
  }

  /**
   * Temporarily mocked data
   * 
   * @param keys 
   * @returns 
   */
  public fakeCountriesRequest(term: string): Observable<ItemModel[]> {
    if (!term || term.length < 2) return of([]);
    const getCountries = (term: string) => countries.filter(e => e.name.toLowerCase().startsWith(term.toLowerCase()));
    return of(getCountries(term)).pipe(tap(() => getCountries(term)));
  }

}
