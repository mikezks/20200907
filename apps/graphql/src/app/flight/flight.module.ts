import { Module } from '@nestjs/common';
import { FlightResolver } from './resolver/flight.resolver';
import { FlightService } from './services/flight.service';
import { PassengerService } from './services/passenger.service';

@Module({
  providers: [
    FlightResolver,
    FlightService,
    PassengerService
  ]
})
export class FlightModule {}
