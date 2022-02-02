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
  public selectedOption: ItemModel;
  public isDisplayed: boolean;

  constructor() { }

  public ngOnInit(): void { }

  public ngAfterViewInit(): void {
    this.doFilter();
  }

  /**
   * Starts to listen values from 
   * the users's input
   * 
   */
  public doFilter(): void {
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

  public showResults(data: ItemModel[]): void {
    this.countries = data;
    this.isDisplayed = true;
  }

  public selectOption(option: ItemModel): void {
    this.inputValue = option.name;
    this.selectedOption = option;
    this.countries = [];
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
  public fakeCountriesRequest(name?: string): Observable<ItemModel[]> {
    // if (!term || term.length < 2) return of([]);
    const getCountries = (name?: string) => {
      if (name && name.length > 0) {
        return countries.filter(country => country.name.toLowerCase().startsWith(name.toLowerCase()));
      } else {
        return countries;
      }
    };
    return of(getCountries(name)).pipe(tap(() => getCountries(name)));
  }

  @HostListener("document:click", ["$event"])
  public onDocumentClick(event: MouseEvent): void {
    if (this.isDisplayed && !this.outputRef.nativeElement.contains(event.target as Element)) {
      this.isDisplayed = false;
    }
  }
}
