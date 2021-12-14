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

export interface Item {
  name: string;
  price: number;
  date: string;
}

export interface IMessage {
  prices: Item[];
  clients: number;
}
