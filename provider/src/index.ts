import * as dotenv from 'dotenv';
import WebSocket from 'ws';
import initGenerator from './get-item';
import { IClient, IClients } from './types';

dotenv.config({ path: __dirname + '/.env' });

const PORT = parseInt(process.env.PORT as string) || 9000;
const INTERVAL = parseInt(process.env.INTERVAL as string) || 1; // seconds

const clients: IClients = new Map();

const wss = new WebSocket.Server({ port: PORT });

const onConnect = (client: IClient, req: any) => {
  clients.set(req.connection, client);

  client.on('close', () => clients.delete(req.connection));
};

wss.on('connection', onConnect);

initGenerator(clients, INTERVAL);

export { clients };
