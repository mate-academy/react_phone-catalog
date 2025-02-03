import { Link } from 'react-router-dom';
import '../styles/page.scss';
import { ProductsSort } from '../components/ProductsSort';
import { useEffect, useState } from 'react';
import { getProducts } from '../services/products';
import { Gadget } from '../types/Gadget';
import { ProductType } from '../types/ProductType';
import { Loader } from '../components/Loader';

export const PhonesPage = () => {
  const [phones, setPhones] = useState<Gadget[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchPhones = () => {
    setLoading(true);
    setError('');
    getProducts()
      .then(products => {
        const filteredPhones = products.filter(
          (product: Gadget) => product.category === ProductType.phones,
        );

        setPhones(filteredPhones);
      })
      .catch(err => {
        setError('Something went wrong');
        // eslint-disable-next-line no-console
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPhones();
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
          <Link to="/phones" className="selected-cat__active--name">
            Phones
          </Link>
        </div>
        <h1 className="selected-cat__title">Mobile phones</h1>
        {error && (
          <>
            <p className="selected-cat__error">{error}</p>
            <button
              type="button"
              className="selected-cat__reload"
              onClick={fetchPhones}
            >
              Reload
            </button>
          </>
        )}
        <p className="selected-cat__text">
          {!error && !!phones.length && `${phones.length} models`}
        </p>
        {loading ? (
          <Loader />
        ) : (
          <>
            {!!phones.length && !error ? (
              <ProductsSort products={phones} />
            ) : (
              !error && (
                <p className="selected-cat__no-product">
                  There are no phones yet
                </p>
              )
            )}
          </>
        )}
      </div>
    </div>
  );
};
