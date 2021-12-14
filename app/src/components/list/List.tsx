import cl from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import styles from './List.module.scss';

interface Props {
  names: string[];
}

const List = ({ names }: Props) => {
  const { pathname } = useLocation();
  const current = pathname.split('/')[1];

  const list = names.map((name) => (
    <Link
      to={`/${name}`}
      key={name}
      className={cl(styles.link, name === current ? styles.isCurrent : '')}
    >
      {name}
    </Link>
  ));

  return <nav className={styles.list}>{list}</nav>;
};

export default List;
