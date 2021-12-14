import * as dotenv from 'dotenv';
import WebSocket from 'ws';
import { IMessage } from './types';

dotenv.config({ path: __dirname + '/.env' });

const { PROVIDER_URI, PROVIDER_PORT } = process.env;

const initProviderListener = (handler: (arg: IMessage) => void) => {
  const ws = new WebSocket(`ws://${PROVIDER_URI}:${PROVIDER_PORT}`);

  ws.on('message', (message: string) => {
    handler(JSON.parse(message) as IMessage);
  });

  ws.on('close', function close() {
    console.log('disconnected');
  });
};

export default initProviderListener;
