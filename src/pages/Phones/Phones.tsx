import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { Products } from '../../types/Alltypes';
import { getData } from '../../fetch/httpClient';
import styles from './Phones.module.scss';
import { ProductCarts } from '../../Functional/ProductCart/ProductCarts';

type Props = {
  phone?: Products[];
};

export const Phones: React.FC<Props> = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [phones, setPhones] = useState<Products[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortType, setSortType] = useState('');

  const getSortedPhones = () => {
    const sorted = [...phones];

    switch (sortType) {
      case 'age':
        return sorted.sort((a, b) => b.year - a.year);
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'price':
        return sorted.sort((a, b) => a.price - b.price);
      default:
        return sorted;
    }
  };

  const displayedPhones = getSortedPhones();

  useEffect(() => {
    getData<Products[]>('./api/phones.json')
      .then(data => setPhones(data))
      .catch(() => setError('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  // if (error) {
  //   return (
  //     <div>
  //       {error} <button onClick={() => window.location.reload()}>Retry</button>
  //     </div>
  //   );
  // }

  return (
    <div className={styles.containerPhones}>
      <Link to="/" className={styles.home}>
        <button className={styles.homeButton}>
          <img src="/img/home.svg" alt="home" className={styles.homeImg} />
          <span className={styles.homeGo}>{'>'}</span>

          <span className={styles.homeGoTo}>Phones</span>
        </button>
      </Link>

      <h1 className={styles.title}>Mobile phones</h1>

      <p className={styles.phonesModels}>{phones.length} Models</p>

      <div className={styles.bySortedBlock}>
        <div className={styles.bySorted}>Sort by</div>
        <select
          className={styles.select}
          value={sortType}
          onChange={e => setSortType(e.target.value)}
        >
          <option value="age">Newest</option>
          <option value="title">Alphabetically</option>
          <option value="price">Cheapest</option>
        </select>
      </div>

      <div className={styles.byFilteredBlock}>
        <div className={styles.byItems}>Items on page</div>
        <select className={styles.select}>
          <option value="4">4</option>
          <option value="8">8</option>
          <option value="16">16</option>
          <option value="all">All</option>
        </select>
      </div>

      <div className={styles.catalogGrid}>
        {displayedPhones.map(phone => (
          <div key={phone.itemId} className={styles.gridItem}>
            <ProductCarts product={phone} />
          </div>
        ))}
      </div>
    </div>
  );
};
