import axios from 'axios';
import { addDays, addMinutes, addMonths, addYears, format } from 'date-fns';

const UTC_FORMAT = "yyyy-MM-dd'T'HH:mm:ss'Z'";

const { REACT_APP_API_URI = '', REACT_APP_API_PORT = '' } = { ...process.env };
const apiUrl =
  REACT_APP_API_URI &&
  REACT_APP_API_PORT &&
  `//${REACT_APP_API_URI}:${REACT_APP_API_PORT}`;

export const formatUTCDate = (date: Date | string): string => {
  const _date = typeof date === 'string' ? new Date(date) : date;

  return format(addMinutes(_date, _date.getTimezoneOffset()), UTC_FORMAT);
};

export async function getNames(): Promise<string[] | undefined> {
  if (apiUrl) {
    try {
      const response = await axios.get(`${apiUrl}/names`);

      return response.data.map((names: string[]) => names);
    } catch (error) {
      console.error(error);
    }
  } else {
    console.error('No API URL');
  }
}

export async function getPrices(name: string): Promise<string[] | undefined> {
  if (apiUrl) {
    const now = formatUTCDate(new Date());
    const minusDay = formatUTCDate(addDays(new Date(), -1));
    const minusMonth = formatUTCDate(addMonths(new Date(), -1));
    const minusYear = formatUTCDate(addYears(new Date(), -1));

    const currentPath = `/${name}/current`;
    const dayPath = `/${name}/average?from=${minusDay}&to=${now}`;
    const monthPath = `/${name}/average?from=${minusMonth}&to=${now}`;
    const yearPath = `/${name}/average?from=${minusYear}&to=${now}`;

    try {
      const requests = [
        axios.get(`${apiUrl}${currentPath}`),
        axios.get(`${apiUrl}${dayPath}`),
        axios.get(`${apiUrl}${monthPath}`),
        axios.get(`${apiUrl}${yearPath}`),
      ];

      return Promise.all(requests).then((responses) => {
        const [current, day, month, year] = responses.map(
          (response) => response.data
        );

        return [current.price, day.average, month.average, year.average];
      });
    } catch (error) {
      console.error(error);
    }
  } else {
    console.error('No API URL');
  }
}
