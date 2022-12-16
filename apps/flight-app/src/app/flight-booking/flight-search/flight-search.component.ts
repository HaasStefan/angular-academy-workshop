import {Component, OnInit} from '@angular/core';
import {FlightService} from '@flight-workspace/flight-lib';
import { Store } from '@ngrx/store';
import { AppState, flightBookingFeatureKey } from '../+state/flight-booking.reducer';
import {flightLoaded, loadFlights} from '../+state/flight-booking.actions';
import { selectFlights, selectFlightsWithParams, whiteListedFlights } from '../+state/flight-booking.selectors';

@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {

  from = 'Hamburg'; // in Germany
  to = 'Graz'; // in Austria
  urgent = false;

  // get flights() {
  //   return this.flightService.flights;
  // }

  flights$ = this.store.select(selectFlights);

  // "shopping basket" with selected flights
  basket: { [id: number]: boolean } = {
    3: true,
    5: true
  };

  constructor(
    private store: Store<AppState>,
    private flightService: FlightService) {
  }

  ngOnInit() {
    console.log('ngOnInit');
  }

  search(): void {
    if (!this.from || !this.to) return;

    this.store.dispatch(loadFlights({
      from: this.from,
      to: this.to,
      urgent: this.urgent
    }));

    // this.flightService.find(this.from, this.to, this.urgent)
    // .subscribe((flights) => {
    //   this.store.dispatch(flightLoaded({flights}));
    // });

    // this.flightService
    //   .load(this.from, this.to, this.urgent);
  }

  delay(): void {
    this.flightService.delay();
  }

}
