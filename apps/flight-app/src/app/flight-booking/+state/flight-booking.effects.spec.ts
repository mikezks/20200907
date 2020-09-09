import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { cold, hot } from 'jasmine-marbles';

import { FlightBookingEffects } from './flight-booking.effects';
import { FlightService } from '@flight-workspace/flight-lib';
import { flightsLoad, flightsLoaded } from './flight-booking.actions';

describe('FlightBookingEffects', () => {
  let actions$: Observable<any>;
  let effects: FlightBookingEffects;
  let flightService: FlightService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FlightBookingEffects,
        provideMockActions(() => actions$),
        {
          provide: FlightService,
          useValue: {
            find: jest.fn()
          }
        }
      ]
    });

    effects = TestBed.inject(FlightBookingEffects);
    flightService = TestBed.inject(FlightService);
  });

  it('should return action flightsLoaded', () => {
    const filter = { from: 'Graz', to: 'Hamburg' };
    const flightsLoadAction = flightsLoad(filter);
    const flights = [{ id: 1, from: 'Graz', to: 'Hamburg', date: 'my date', delayed: false }];
    const flightsLoadedAction = flightsLoaded({ flights });

    actions$ = hot('-a', { a: flightsLoadAction });
    const serviceResponse = cold('-f|', { f: flights });
    const expected = cold('--r', { r: flightsLoadedAction });
    flightService.find = jest.fn(() => serviceResponse);

    expect(effects.flightsLoad$).toBeObservable(expected);
  });
});
