import { useContext, useEffect, useState } from 'react';
import { FilterProducts } from '../FilterProducts';
import { Context } from '../../Store/Store';
import { Link } from 'react-router-dom';
import styles from './Phones.scss';
import { filterCategory } from '../../Functions/FilterCategory/filterCategory';
import { Loader } from '../Loader';

export const Phones = () => {
  const { products } = useContext(Context);
  const [dataReceived, setDataReceived] = useState(false);

  useEffect(() => {
    if (products.length !== 0) {
      setDataReceived(true);
    }
  }, [products]);

  const filterPhone = filterCategory(products, 'phones');

  return (
    <>
      {!dataReceived ? (
        <Loader />
      ) : (
        <div className={styles.phonesPage}>
          <div className="link-block">
            <Link to={`/`}>
              <img src="img/icons/home_icon.svg" alt="home" />
            </Link>
            <span>
              <img src="img/icons/Arrow_Right.svg" alt="arow_left" />
            </span>
            <Link to={`/phones`}>Phones</Link>
          </div>
          <h1>Mobile phones</h1>

          <div className={styles.filterItems}>
            <h3>{`${filterPhone.length} models`}</h3>
          </div>
          {filterPhone.length === 0 ? (
            <div className={styles.container}>
              <h2>No product available yet</h2>
            </div>
          ) : (
            <FilterProducts products={filterPhone}></FilterProducts>
          )}
        </div>
      )}
    </>
  );
};
