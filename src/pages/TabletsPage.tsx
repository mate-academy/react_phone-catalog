import { useEffect, useState } from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Product } from '../types/Product';
import { Link } from 'react-router-dom';
import { ProductsList } from '../components/ProductsList';
import { getTablets } from '../services/products';

export const TabletsPage = () => {
  const [tablets, setTablets] = useState<Product[]>([]);

  useEffect(() => {
    getTablets()
      .then(setTablets)
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <div className="selected-cat">
          <div className="selected-cat__active">
            <Link to="/" className="selected-cat__active--link">
              <svg className="icon icon-home">
                <use href="/img/icons.svg#icon-home"></use>
              </svg>
            </Link>
            <div className="selected-cat__active--arrow">
              <svg className="icon icon-arrow-right">
                <use href="/img/icons.svg#icon-arrow-right"></use>
              </svg>
            </div>
            <Link to="/tablets" className="selected-cat__active--name">
              Tablets
            </Link>
          </div>
          <h1 className="selected-cat__title">Tablets</h1>
          <p className="selected-cat__text">
            {!!tablets.length && `${tablets.length} models`}
          </p>
          {!!tablets.length ? (
            <ProductsList products={tablets} />
          ) : (
            <p className="selected-cat__no-product">There are no tablets yet</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
