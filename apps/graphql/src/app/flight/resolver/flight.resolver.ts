/* eslint-disable @typescript-eslint/no-unused-vars */
import { Resolver, Query, ResolveField, Args, Parent, Field, ObjectType, ID, Int } from '@nestjs/graphql';
import { PassengerService } from '../services/passenger.service';
import { FlightService } from '../services/flight.service';
import { Flight } from '../model/flight.model';

@Resolver(of => Flight)
export class FlightResolver {

  constructor(
    private flightService: FlightService,
    private passengerService: PassengerService
  ) {}

  @Query(returns => Flight)
  flight(@Args('id', { type: () => Int }) id: number) {
    return this.flightService.findOneById(id);
  }

  @ResolveField()
  passengers(@Parent() flight: Flight) {
    const { id } = flight;
    return this.passengerService.findAll({ id });
  }
}
