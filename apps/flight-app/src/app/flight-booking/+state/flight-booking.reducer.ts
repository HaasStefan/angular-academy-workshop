import { Flight } from '@flight-workspace/flight-lib';
import { Action, createReducer, on } from '@ngrx/store';
import * as FlightBookingActions from './flight-booking.actions';

export const flightBookingFeatureKey = 'flightBooking';

// todo appstate interface^
export interface AppState {
  [flightBookingFeatureKey]: State
}

export interface State {
  flights: Flight[];
  blackList: number[]
}

export const initialState: State = {
  flights: [],
  blackList: [3]
};

export const reducer = createReducer(
  initialState,

  on(FlightBookingActions.flightBookingFlightBookings, state => state),

  on(FlightBookingActions.flightLoaded, (state, action) => {
    const flights = action.flights;
    return {
      ...state,
      flights
    };
  })

);
