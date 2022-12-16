import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromFlightBooking from './flight-booking.reducer';

export const selectFlightBookingState = createFeatureSelector<fromFlightBooking.State>(
  fromFlightBooking.flightBookingFeatureKey
);


export const selectFlights = createSelector(
  selectFlightBookingState,
  (s) => s.flights
);

export const blackListedFlights = createSelector(
  selectFlightBookingState,
  (s) => s.blackList
);

export const whiteListedFlights = createSelector(
  selectFlights,
  blackListedFlights,
  (flights, blackList) => flights.filter(f => !blackList.includes(f.id))
);

export const selectFlightsWithParams = (id: number) => createSelector(
  selectFlights,
  (flights) => flights.filter(f => f.id === id)
);
