import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable, of, Subscription } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, startWith, switchMap, tap } from 'rxjs/operators';
import { CountryModel } from '../../domain/models/country.model';
import { CountryService } from '../../services/country.service';

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
  public countries: CountryModel[] = [];
  public selectedOption: CountryModel;
  public isDisplayed: boolean;

  constructor(protected countryService: CountryService) { }

  public ngOnInit(): void {
  }

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
      .subscribe((data: CountryModel[]) => this.showResults(data));
  }

  public showResults(data?: CountryModel[]): void {
    this.countries = data ? data : this.countryService.getCountryList();
    this.isDisplayed = !this.isDisplayed;
  }

  public selectOption(option: CountryModel): void {
    this.inputValue = option.name;
    this.selectedOption = option;
    this.isDisplayed = false;
    this.countries = [];
  }

  public ngOnDestroy(): void {
    this.keyupSubscription.unsubscribe();
  }

  public focusOut() {
    this.isDisplayed = false;
  }

  /**
   * Temporarily mocked data
   * 
   * @param keys 
   * @returns 
   */
  public fakeCountriesRequest(name?: string): Observable<CountryModel[]> {
    // if (!name || name.length < 2) return of([]);
    const getCountries = (name?: string) => {
      if (name && name.length > 0) {
        return this.countryService
          .getCountryList()
          .filter(country => country.name.toLowerCase().startsWith(name.toLowerCase()));
      } else {
        return this.countryService.getCountryList();
      }
    };
    return of(getCountries(name)).pipe(tap(() => getCountries(name)));
  }

  // @HostListener("document:click", ["$event"])
  // public onDocumentClick(event: MouseEvent): void {
  //   if (this.isDisplayed && !this.outputRef.nativeElement.contains(event.target as Element)) {
  //     this.isDisplayed = false;
  //   }
  // }
}
