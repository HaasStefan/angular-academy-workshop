import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Flight } from '@flight-workspace/flight-lib';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  filter,
  interval,
  map,
  Observable,
  of,
  ReplaySubject,
  share,
  startWith,
  Subject,
  Subscription,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';

@Component({
  selector: 'flight-workspace-flight-lookahead',
  templateUrl: './flight-lookahead.component.html',
  styleUrls: ['./flight-lookahead.component.css'],
})
export class FlightLookaheadComponent implements OnInit, OnDestroy {
  control!: FormControl;
  flights$!: Observable<Flight[]>;

  private loadingSubject = new BehaviorSubject(false);
  readonly loading$ = this.loadingSubject.asObservable();

  online$!: Observable<boolean>;

  subscription = new Subscription();
  destroy = new Subject<void>();

  obs$ = interval(1000).pipe(tap(console.log));

  constructor(private http: HttpClient) {}

  ngOnDestroy(): void {
    //this.subscription.unsubscribe();
    this.destroy.next();
  }

  ngOnInit(): void {
    this.control = new FormControl();

    this.online$ = interval(2000).pipe(
      startWith(0),
      map(() => Math.random() > 0.5), // f, f, f, t, t, f
      distinctUntilChanged(),
      //shareReplay({bufferSize: 1, refCount: true}),
      share({
        connector: () => new ReplaySubject(1),
      })
    );

    const input$ = this.control.valueChanges.pipe(
      debounceTime(900),
      distinctUntilChanged()
    );

    const obs$ = interval(1000).pipe(tap(console.log));

    ///obs$.pipe(takeUntil(this.destroy)).subscribe();

    //this.subscription.add(
    //  obs$.subscribe()
    //);

    this.flights$ = combineLatest({
      online: this.online$,
      input: input$,
    }).pipe(
      filter(({ online }) => online),
      tap(() => this.loadingSubject.next(true)),
      switchMap(({ input }) => this.load(input)),
      tap(() => this.loadingSubject.next(false))
    );
  }

  load(from: string): Observable<Flight[]> {
    const url = 'http://www.angular.at/api/flight';

    const params = new HttpParams().set('from', from);

    // If you use json-server, use the parameter from_like:
    // const params = new HttpParams().set('from_like', from);

    const headers = new HttpHeaders().set('Accept', 'application/json');

    return this.http.get<Flight[]>(url, { params, headers }).pipe(
      catchError((error) => {
        console.error('error', error);
        return of([]);
      })
    );
  }
}
