import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { ProductCarts } from '../../inMain/ProductCart/ProductCarts';
import { FullProducts } from '../../types/Alltypes';
import { getData } from '../../fetch/httpClient';
import styles from './Phones.module.scss';

export const Phones: React.FC = () => {
  const [phones, setPhones] = useState<FullProducts[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getData<FullProducts[]>('./api/phones.json')
      .then(data => setPhones(data))
      .catch(() => setError('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  // eslint-disable-next-line curly
  if (loading) return <div>Loading...</div>;
  // if (error) return <div>{error} <button onClick={() => window.location.reload()}>Retry</button></div>;

  return (
    <div className="container">
      <Link to="/" className={styles.home}>
        <button className={styles.homeButton}>
          <img src="/img/home.svg" alt="home" className={styles.homeImg} />
          <span className={styles.homeGo}>{'>'}</span>
          <span className={styles.homeGoTo}>Phones</span>
        </button>
      </Link>
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
