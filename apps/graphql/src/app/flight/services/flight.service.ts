import { Injectable } from '@nestjs/common';
import { flightData } from '../data/flight.data';

@Injectable()
export class FlightService {
  findOneById(id: number) {
    flightData.id = id;
    return flightData;
  }
}
