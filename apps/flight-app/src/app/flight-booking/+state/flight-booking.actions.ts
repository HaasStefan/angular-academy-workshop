import { Flight } from '@flight-workspace/flight-lib';
import { createAction, props } from '@ngrx/store';

export const flightBookingFlightBookings = createAction(
  '[FlightBooking] FlightBooking FlightBookings'
);

export const flightLoaded = createAction(
  '[FlightBooking] FlightsLoaded',
  props<{flights: Flight[]}>()
);


export const loadFlights = createAction(
  '[FlightBooking] LoadFlights',
  props<{from: string, to: string, urgent: boolean}>()
);

