import * as dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import initProviderListener from './listen-provider';
import { IItem, IMessage } from './types';

dotenv.config({ path: __dirname + '/.env' });

const {
  API_PORT = 9001,
  MONGODB_USERNAME,
  MONGODB_PASSWORD,
  MONGODB_URL = '',
} = process.env;

const Schema = mongoose.Schema;
const recordScheme = new Schema(
  { name: String, price: Number, date: Date },
  { versionKey: false }
);
const Record = mongoose.model<IItem>('record', recordScheme);

const connectOptions: mongoose.ConnectOptions = {
  dbName: 'recordsdb',
  user: MONGODB_USERNAME,
  pass: MONGODB_PASSWORD,
  autoCreate: true,
};

const app = express();

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

const massageHandler = (obj: IMessage) => {
  const { prices } = obj;

  prices?.length &&
    prices.forEach((item) => {
      const record = new Record(item);

      record.save((err: any): void => err && console.log(err));
    });
};

if (MONGODB_URL) {
  mongoose.connect(MONGODB_URL, connectOptions, (err) => {
    if (err) return console.log(err);

    app.listen(API_PORT, () => {
      initProviderListener(massageHandler);

      console.log(`API listening at http://localhost:${API_PORT}`);
    });
  });
} else {
  console.log('MONGODB_URL is not defined');
}

app.get('/names', (req, res) => {
  Record.find()
    .distinct('name')
    .exec((err, names: string[]) => {
      if (err) {
        return res.status(500).send(err);
      }

      res.send(names);
    });
});

app.get('/:name/current', (req, res) => {
  const { name = '' } = req.params as any;

  name &&
    Record.find({ name })
      .sort({ date: -1 })
      .limit(1)
      .exec((err, records) => {
        if (err) return res.status(500).send(err);
        res.send(records[0]);
      });
});

app.get('/:name/average', (req, res) => {
  const { name = '' } = req.params as any;
  const { from = '', to = '' } = req.query as any;

  const hasAllParams = name && from && to;

  if (!hasAllParams) {
    return res.status(400).send('invalid params');
  }

  const pipeline = [
    {
      $match: {
        name,
        date: {
          $gte: new Date(from),
          $lte: new Date(to),
        },
      },
    },
    {
      $group: {
        _id: null,
        average: { $avg: '$price' },
      },
    } as any,
  ];

  Record.aggregate(pipeline).exec((err, result: IItem[]) => {
    if (err) return res.status(500).send(err);

    res.send({ ...result[0], name, from, to });
  });
});

app.get('/', (req, res) => {
  res.send('empty request');
});
