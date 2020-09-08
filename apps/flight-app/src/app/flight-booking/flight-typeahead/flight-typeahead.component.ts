import { Component, OnInit, OnDestroy } from '@angular/core';
import { timer, Observable, Subscription, of, combineLatest } from 'rxjs';
import { tap, debounceTime, switchMap, map, filter, distinctUntilChanged } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Flight } from '@flight-workspace/flight-lib';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'flight-workspace-flight-typeahead',
  templateUrl: './flight-typeahead.component.html',
  styleUrls: ['./flight-typeahead.component.css']
})
export class FlightTypeaheadComponent implements OnInit, OnDestroy {
  counter$: Observable<number>;
  subscription: Subscription;

  control = new FormControl();
  flights$: Observable<Flight[]>;
  loading: boolean;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    //this.rxjsDemo();

    this.flights$ =
      this.control.valueChanges.pipe(
          (filterValue) => combineLatest([filterValue, of(1)]),
          tap(([_, counter]) => console.log(counter)),
          map(([from, _]) => from),
          debounceTime(300),
          filter((filterValue: string) => filterValue.length > 2),
          distinctUntilChanged(),
          tap(_ => this.loading = true),
          switchMap(filterValue => this.load(filterValue)),
          tap(_ => this.loading = false),
        );
  }

  load(from: string): Observable<Flight[]>  {
    const url = "http://www.angular.at/api/flight";

    const params = new HttpParams()
                        .set('from', from);

    const headers = new HttpHeaders()
                        .set('Accept', 'application/json');

    return this.http.get<Flight[]>(url, {params, headers});
  }

  rxjsDemo(): void {
    this.counter$ = timer(0, 1000).pipe(
      tap(num => console.log(num))
    );

    /* this.subscription =
      this.counter$
        .subscribe(console.log); */
  }

  ngOnDestroy(): void {
    //this.subscription.unsubscribe();
  }
}
