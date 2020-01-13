import {Location} from "./location"

export class BenchRequest {
    userId: string;
    description: string;
    backrest: boolean;
    ergonomy: number;
    image: string;
    seats:number;
    material:string
    location:Location;
  }