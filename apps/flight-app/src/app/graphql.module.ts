import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import { GraphqlComponent } from './graphql/graphql.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

const uri = './graphql'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: httpLink.create({uri}),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: 'ui-graphql',
      component: GraphqlComponent
    }])
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
  declarations: [GraphqlComponent],
})
export class GraphQLModule {}
