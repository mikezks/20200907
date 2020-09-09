import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromFlightBooking from './flight-booking.reducer';

export const selectFlightBookingState = createFeatureSelector<fromFlightBooking.State>(
  fromFlightBooking.flightBookingFeatureKey
);

export const selectFlights = createSelector(
  // Selectors
  selectFlightBookingState,
  /* selectFlightIdFromRouter, */
  // Projector
  (flightBookingState, id) => flightBookingState.flights/* .find(f => f.id === id) */
);
