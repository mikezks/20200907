/* eslint-disable @typescript-eslint/no-unused-vars */
import { ObjectType, Field, ID } from "@nestjs/graphql";

@ObjectType()
export class Passenger {
  @Field(type => ID) id: number;
  @Field() firstName: string;
  @Field() name: string;
  @Field() passengerStatus: string;
  @Field() bonusMiles: number;
}
