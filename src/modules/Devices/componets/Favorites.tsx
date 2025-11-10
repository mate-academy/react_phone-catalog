import { useEffect } from 'react';
import { ProductType } from '../../../types/product';
import ProductList from './ProductList';

type Props = {
  activeProducts: ProductType[];
};

export const Favorites: React.FC<Props> = ({ activeProducts }) => {
  useEffect(() => {
    if (activeProducts.length) {
      localStorage.setItem('activeProducts', JSON.stringify(activeProducts));
    }
  }, [activeProducts]);

  return (
    <main className="favourites">
      <section className="favourites-content">
        <div className="container">
          <div className="favourites__path path">
            <a href="" className="path__home"></a>
            <span className="path__arrow"></span>
            <a href="" className="path__type smallText">
              Favourites
            </a>
          </div>
          <h1 className="favourites__title title--biggest">Favourites</h1>
          {activeProducts.length > 0 ? (
            <>
              <span className="favourites__count body-text-600 body-text-600--gray">{`${activeProducts.length} items`}</span>

              <ProductList products={activeProducts} />
            </>
          ) : (
            <p>Your favourites is empty</p>
          )}
        </div>
      </section>
    </main>
  );
};
