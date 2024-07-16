import { useEffect, useState } from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { getProducts } from '../services/products';
import { Link } from 'react-router-dom';
import { ProductsSort } from '../components/ProductsSort';
import { ProductType } from '../types/ProductType';
import { Gadget } from '../types/Gadget';
import { Loader } from '../components/Loader';

export const AccessoriesPage = () => {
  const [accessories, setAccessories] = useState<Gadget[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchAccessories = () => {
    setLoading(true);
    setError('');
    getProducts()
      .then(products => {
        const filteredAccessories = products.filter(
          (product: Gadget) => product.category === ProductType.accessories,
        );

        setAccessories(filteredAccessories);
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAccessories();
  }, []);

  return (
    <>
      <Header />
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
            <Link to="/accessories" className="selected-cat__active--name">
              Accessories
            </Link>
          </div>
          <h1 className="selected-cat__title">Accessories</h1>
          {error && (
            <>
              <p className="selected-cat__error">{error}</p>
              <button
                type="button"
                className="selected-cat__reload"
                onClick={fetchAccessories}
              >
                Reload
              </button>
            </>
          )}
          <p className="selected-cat__text">
            {!error && !!accessories.length && `${accessories.length} models`}
          </p>
          {loading ? (
            <Loader />
          ) : (
            <>
              {!!accessories.length && !error ? (
                <ProductsSort products={accessories} />
              ) : (
                !error && (
                  <p className="selected-cat__no-product">
                    There are no accessories yet
                  </p>
                )
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
