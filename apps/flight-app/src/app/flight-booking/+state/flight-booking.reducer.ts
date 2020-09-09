import { Action, createReducer, on } from '@ngrx/store';
import * as FlightBookingActions from './flight-booking.actions';
import { Flight } from '@flight-workspace/flight-lib';
import produce from 'immer';

export const flightBookingFeatureKey = 'flightBooking';

export interface State {
  flights: Flight[];
}

export const initialState: State = {
  flights: []
};

export interface FlightBookingAppState {
  flightBooking: State;
}

export const reducer = createReducer(
  initialState,

  on(FlightBookingActions.flightsLoaded, (state, action) => {
    const flights = action.flights;
    return { ...state, flights };
  }),
  on(FlightBookingActions.flightUpdate, (state, action) => {
    const flights = state.flights.map(f => f.id === action.flight.id ? action.flight : f);
    return { ...state, flights };
  }),

);

/**
 * Immer.js immutable updates
 */

const data = [
  {
    id: 1,
    value: 'mein test'
  }
];

const myUpdate = produce(data, draftState => {
  draftState[0].id = 5;
});
