import { Component, OnInit, OnDestroy } from '@angular/core';
import { timer, Observable, Subscription } from 'rxjs';
import { tap, debounceTime, switchMap } from 'rxjs/operators';
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
          debounceTime(300),
          tap(_ => this.loading = true),
          switchMap(filter => this.load(filter)),
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
