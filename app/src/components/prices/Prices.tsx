import cl from 'classnames';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getPrices } from '../../utils/api';
import styles from './Prices.module.scss';

interface RowProps {
  title: string;
  value: number;
  Tag?: keyof JSX.IntrinsicElements;
}

export const Row = ({ title, value, Tag = 'div' }: RowProps) => (
  <Tag className={styles.row}>
    <span>{title}</span>
    <span className={styles.number}>{value}</span>
  </Tag>
);

interface TablesProps {
  prices: number[];
}

export const Tables = ({ prices }: TablesProps) => {
  const [current, day, month, year] = prices;

  return (
    <>
      <div className={cl(styles.table, styles.current)}>
        <Row title="Current" value={current} Tag="h2" />
      </div>
      <div className={styles.subtitle}>Averages:</div>
      <div className={styles.table}>
        <Row title="Day" value={day} />
        <Row title="Month" value={month} />
        <Row title="Year" value={year} />
      </div>
    </>
  );
};

const Prices = () => {
  const { pathname } = useLocation();
  const name = pathname.split('/')[1];

  const [prices, setPrices] = useState<number[]>([]);

  const fetchPrices = async (name: string): Promise<void> => {
    const [current = 0, day = 0, month = 0, year = 0] =
      (await getPrices(name)) || [];

    setPrices([+current, +day, +month, +year]);
  };

  useEffect(() => {
    setPrices([]);
    name && fetchPrices(name);
  }, [name]);

  const content = name && prices[0] && (
    <div className={styles.prices}>
      <Tables prices={prices} />
      <button
        type="button"
        onClick={() => fetchPrices(name)}
        className={styles.refresh}
      >
        Refresh
      </button>
    </div>
  );
  return content || null;
};

export default Prices;
