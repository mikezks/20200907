/* eslint-disable @typescript-eslint/no-unused-vars */
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Passenger } from './passenger.model';

@ObjectType()
export class Flight {
  @Field(type => ID) id: number;
  @Field() from: string;
  @Field() to: string;
  @Field() date: string;
  @Field() delayed: boolean;
  @Field(type => [Passenger]) passengers: Passenger[];
}
