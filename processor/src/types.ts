import { Document } from 'mongoose';

export enum Names {
  facebook = 'facebook',
  google = 'google',
  twitter = 'twitter',
}

export interface IClient {
  send: (arg0: string) => void;
  on: (arg0: string, arg1: () => void) => void;
  conn: any;
}

export type IClients = Map<string, IClient>;

export interface IItem extends Document {
  name: string;
  price: number;
  date: string;
}

export interface IAverage {
  name: string;
  average: number;
  fromDate: string;
  toDate: string;
}

export interface IMessage {
  prices: IItem[];
  clients: number;
}
