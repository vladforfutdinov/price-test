import { addMinutes, format } from 'date-fns';
import { Item } from './types';

const UTC_FORMAT = 'yyyy-MM-dd HH:mm:ss';

export const formatDate = (date: Date): string =>
  format(addMinutes(date, date.getTimezoneOffset()), UTC_FORMAT);

export const getItem = (name: string): Item => ({
  name,
  price: +(Math.random() * 100).toFixed(6),
  date: formatDate(new Date()),
});
