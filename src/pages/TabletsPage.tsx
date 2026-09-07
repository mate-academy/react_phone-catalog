import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductsSort } from '../components/ProductsSort';
import { getProducts } from '../services/products';
import { Gadget } from '../types/Gadget';
import { ProductType } from '../types/ProductType';
import { Loader } from '../components/Loader';

export const TabletsPage = () => {
  const [tablets, setTablets] = useState<Gadget[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchTablets = () => {
    setLoading(true);
    setError('');
    getProducts()
      .then(products => {
        const filteredTablets = products.filter(
          (product: Gadget) => product.category === ProductType.tablets,
        );

        setTablets(filteredTablets);
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTablets();
  }, []);

  return (
    <div className="container">
      <div className="selected-cat">
        <div className="selected-cat__active">
          <Link to="/" className="selected-cat__active--link">
            <svg className="icon icon-home">
              <use href="img/icons.svg#icon-home"></use>
            </svg>
          </Link>
          <div className="selected-cat__active--arrow">
            <svg className="icon icon-arrow-right">
              <use href="img/icons.svg#icon-arrow-right"></use>
            </svg>
          </div>
          <Link to="/tablets" className="selected-cat__active--name">
            Tablets
          </Link>
        </div>
        <h1 className="selected-cat__title">Tablets</h1>
        {error && (
          <>
            <p className="selected-cat__error">{error}</p>
            <button
              type="button"
              className="selected-cat__reload"
              onClick={fetchTablets}
            >
              Reload
            </button>
          </>
        )}
        <p className="selected-cat__text">
          {!error && !!tablets.length && `${tablets.length} models`}
        </p>
        {loading ? (
          <Loader />
        ) : (
          <>
            {!!tablets.length && !error ? (
              <ProductsSort products={tablets} />
            ) : (
              !error && (
                <p className="selected-cat__no-product">
                  There are no tablets yet
                </p>
              )
            )}
          </>
        )}
      </div>
    </div>
  );
};
