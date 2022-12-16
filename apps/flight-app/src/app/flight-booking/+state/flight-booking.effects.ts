import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap, map, switchMap } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import * as FlightBookingActions from './flight-booking.actions';
import { FlightService } from '@flight-workspace/flight-lib';

@Injectable()
export class FlightBookingEffects {

  loadFlights$ = createEffect(() => this.actions$.pipe(
    ofType(FlightBookingActions.loadFlights),
    switchMap(({from, to, urgent}) => this.flightService.find(from, to, urgent)),
    map(flights => FlightBookingActions.flightLoaded({flights}))
  ));

  constructor(private actions$: Actions, private flightService: FlightService) {}
}
