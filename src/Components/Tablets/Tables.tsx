import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Tables.module.scss';
import { FilterProducts } from '../FilterProducts';
import { Context } from '../../Store/Store';
import { filterCategory } from '../../Functions/FilterCategory/filterCategory';
import { Loader } from '../Loader';

export const Tables = () => {
  const { products } = useContext(Context);
  const [dataReceived, setDataReceived] = useState(false);

  useEffect(() => {
    if (products.length !== 0) {
      setDataReceived(true);
    }
  }, [products]);

  const filterTablets = filterCategory(products, 'tablets');

  return (
    <>
      {!dataReceived ? (
        <Loader />
      ) : (
        <div className="phones-page">
          <div className="link-block">
            <Link to={`/`}>
              <img src="img/icons/home_icon.svg" alt="home" />
            </Link>
            <span>
              <img src="img/icons/Arrow_Right.svg" alt="arow_left" />
            </span>
            <Link to={`/tables`}>Tables</Link>
          </div>
          <h1>Tables</h1>
          <div className="filter-items">
            <h3>{`${filterTablets.length} models`}</h3>
          </div>
          {filterTablets.length === 0 ? (
            <>
              <div className={styles.container}>
                <h2>No product available yet</h2>
              </div>
            </>
          ) : (
            <FilterProducts products={filterTablets}></FilterProducts>
          )}
          ;
        </div>
      )}
    </>
  );
};
