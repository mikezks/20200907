import { Injectable } from '@nestjs/common';
import { passengerData } from '../data/passenger.data';

@Injectable()
export class PassengerService {
  findAll(flight: { id: number }) {
    passengerData[0].id = flight.id * 300;
    return passengerData;
  }
}
