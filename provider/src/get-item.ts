import { IClients, IMessage, Item, Names } from './types';
import { getItem } from './utils';

const getItems = (names: string[]): Item[] => names.map(getItem);

const getMessage = (clients: IClients): IMessage => ({
  prices: getItems(Object.values(Names) as string[]),
  clients: clients.size,
});

const sendMessage = (clients: IClients, message: any): void =>
  clients.forEach((client) => client.send(message));

const initGenerator = (clients: IClients, interval: number): void => {
  sendMessage(clients, getMessage(clients));

  setInterval(() => {
    sendMessage(clients, JSON.stringify(getMessage(clients)));
  }, interval * 1000);
};

export default initGenerator;
