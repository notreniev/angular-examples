import { Injectable } from '@angular/core';
import { mockCountriesList } from '../domain/mocks/countryList.mock';
import { CountryModel } from '../domain/models/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor() { }

  getCountryList(values?: CountryModel[]): CountryModel[] {
    return mockCountriesList;
  }
}
