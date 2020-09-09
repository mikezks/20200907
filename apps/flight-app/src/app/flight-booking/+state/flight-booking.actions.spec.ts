import * as fromFlightBooking from './flight-booking.actions';

describe('FlightBookings', () => {
  it('should return an action', () => {
    expect(fromFlightBooking.flightsLoad({ from: '', to: ''}).type).toBe('[FlightBooking] Flights load');
  });
});
