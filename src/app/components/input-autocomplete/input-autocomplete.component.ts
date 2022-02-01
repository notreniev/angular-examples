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

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.keyupSubscription = fromEvent(this.inputRef.nativeElement, 'keyup')
      .pipe(
        debounceTime(200),
        map((e: Event): string => (e.target as HTMLInputElement).value),
        distinctUntilChanged(),
        switchMap(term => this.fakeCountriesRequest(term)),
        catchError((source) => source.pipe(startWith([])))
      ).subscribe((data: ItemModel[]) => this.showResults(data));
  }

  /**
   * Temporarily mocked data
   * 
   * @param keys 
   * @returns 
   */
  public fakeCountriesRequest(keys: string): Observable<ItemModel[]> {
    const getCountries = (keys: string) =>
      countries.filter(e => e.name.toLowerCase().startsWith(keys.toLowerCase()));

    if (!keys || keys.length < 2) return of([]);
    return of(getCountries(keys)).pipe(
      tap(() => getCountries(keys))
    );
  }

  public showResults(res: ItemModel[]): void {
    this.outputRef.nativeElement.innerHTML = res
      .map((e: ItemModel) => `<li class="list-item">${e?.name}</li>`).join('');
  }

  @HostListener('click', ['$event.target'])
  public clicked(e?: HTMLInputElement): void {
    if (!e.innerText) return;
    this.inputValue = e.innerText;
    this.outputRef.nativeElement.innerHTML = [];
    e.innerText = "";
  }

  ngOnDestroy(): void {
    this.keyupSubscription.unsubscribe();
  }

}
