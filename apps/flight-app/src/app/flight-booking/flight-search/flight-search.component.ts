import {Component, OnInit} from '@angular/core';
import {FlightService, Flight} from '@flight-workspace/flight-lib';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromFlightBooking from '../+state';
import { take } from 'rxjs/operators';


@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {

  from = 'Hamburg'; // in Germany
  to = 'Graz'; // in Austria
  urgent = false;
  flights$: Observable<Flight[]>;
  /* get flights() {
    return this.flightService.flights;
  } */

  // "shopping basket" with selected flights
  basket: object = {
    "3": true,
    "5": true
  };

  constructor(
    private flightService: FlightService,
    private store: Store<fromFlightBooking.FlightBookingAppState>) {
  }

  ngOnInit() {
    this.flights$ = this.store.pipe(
      select(fromFlightBooking.selectFlights)
    );
  }

  search(): void {
    if (!this.from || !this.to) return;

    /* this.flightService
      .load(this.from, this.to, this.urgent); */

    /* this.flightService.find(this.from, this.to)
      .subscribe(
        flights => this.store.dispatch(
          fromFlightBooking.flightsLoaded({ flights })
        )
      ); */

    this.store.dispatch(
      fromFlightBooking.flightsLoad({ from: this.from, to: this.to})
    );
  }

  delay(): void {
    // this.flightService.delay();

    this.flights$.pipe(take(1))
      .subscribe(flights => {
        const flight = flights[0];
        const oldDate = new Date(flight.date);
        const newDate = new Date(oldDate.getTime() + 1000 * 60 * 15).toISOString();
        const newFlight = { ...flight, date: newDate };

        this.store.dispatch(
          fromFlightBooking.flightUpdate({ flight: newFlight })
        );
      });
  }

}
