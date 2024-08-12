import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import styles from './Accessories.module.scss';
import { FilterProducts } from '../FilterProducts';
import { filterCategory } from '../../Functions/FilterCategory/filterCategory';
import { Context } from '../../Store/Store';
import { Loader } from '../Loader';

export const Accessories = () => {
  const { products } = useContext(Context);
  const [dataReceived, setDataReceived] = useState(false);

  useEffect(() => {
    if (products.length !== 0) {
      setDataReceived(true);
    }
  }, [products]);

  const filterSmart = filterCategory(products, 'accessories');

  return (
    <div className={styles.pageContainer}>
      {!dataReceived ? (
        <Loader />
      ) : (
        <div>
          <div className="link-block">
            <Link to={`/`}>
              <img src="img/icons/home_icon.svg" alt="home" />
            </Link>
            <span>
              <img src="img/icons/Arrow_Right.svg" alt="arow_left" />
            </span>
            <Link to={`/smart`}>Accessories</Link>
          </div>
          <h1>Accessories</h1>
          <div className="filter-items">
            <h3>{`${filterSmart.length} models`}</h3>
          </div>
          {filterSmart.length === 0 ? (
            <div className={styles.container}>
              <h2>No product available yet</h2>
            </div>
          ) : (
            <FilterProducts products={filterSmart}></FilterProducts>
          )}
        </div>
      )}
    </div>
  );
};
