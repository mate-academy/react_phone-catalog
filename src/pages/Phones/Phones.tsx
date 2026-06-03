import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { ProductCarts } from '../../inMain/ProductCart/ProductCarts';
import { PropsPhone } from '../../types/Products';
import { getData } from '../../fetch/httpClient';
import styles from './Phones.module.scss';

type Props = {
  phones?: PropsPhone[] | null;
};

export const Phones: React.FC<Props> = ({ phones }) => {
  const [phonesState, setPhonesState] = useState<PropsPhone[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getData('/phones')
      .then(data => setPhonesState(data))
      .catch(() => setError('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  // eslint-disable-next-line curly
  if (loading) return <div>Loading...</div>;
  // if (error) return <div>{error} <button onClick={() => window.location.reload()}>Retry</button></div>;

  return (
    <div className="container">
      <div>
        <Link to="/" className={styles.home}>
          <button className={styles.homeButton}>
            <img src="/img/home.svg" alt="home" className={styles.homeImg} />
            <p className={styles.homeGo}>{'>'}</p>
            <p className={styles.homeGoTo}>Phones</p>
          </button>
        </Link>
      </div>
      <h1 className="title">Phones</h1>

      {phones?.map(p => (
        <ProductCarts
          key={p.id}
          id={p.id}
          title={p.title}
          price={p.price}
          screen={p.screen}
          capacity={p.capacity}
          ram={p.ram}
        />
      ))}
    </div>
  );
};
