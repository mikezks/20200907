import {Component} from '@angular/core';
import { FlightService, FlightState } from '@flight-workspace/flight-lib';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'sidebar-cmp',
  templateUrl: 'sidebar.component.html',
})

export class SidebarComponent {
  numFlights$: Observable<number>;

  constructor(private flightService: FlightService) {
    this.numFlights$ =
      flightService.flightState$.pipe(
        map((flightState: FlightState) => flightState.flights.length)
      );
  }
}
