import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'flight-workspace-graphql',
  templateUrl: './graphql.component.html',
  styleUrls: ['./graphql.component.css']
})
export class GraphqlComponent implements OnInit {
  data: any;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {}

  getData(): void {
    this.apollo.query<any>({ query: gql`
      {
        flight(id: 200) {
          id,
          from,
          to,
          passengers {
            id,
            firstName,
            name
          }
        }
      }
    `})
    .subscribe(data => this.data = data);
  }
}
