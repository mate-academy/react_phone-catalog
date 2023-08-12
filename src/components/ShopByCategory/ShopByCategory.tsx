import { FC, useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import { categoryLinks } from '../../utils/categoryLinks';
import { PhoneCatalogContext } from '../../context/PhoneCatalogContext';
import { ProductCategory } from '../../types/ProductCategory';

import './ShopByCategory.scss';

export const ShopByCategory: FC = () => {
  const { products } = useContext(PhoneCatalogContext);

  const getProductsLength = useCallback((category: ProductCategory) => {
    return products.filter(product => product.category === category).length;
  }, [products]);

  return (
    <div className="shop-by-category">
      <h1 className="shop-by-category__title">Shop by category</h1>

      <div
        className="shop-by-category__links-container"
        data-cy="categoryLinksContainer"
      >
        {categoryLinks.map(({ name, to, img }) => (
          <div
            className="shop-by-category__card"
          >
            <Link
              to={to}
              className="shop-by-category__link"
            >
              <div
                className={`shop-by-category__img-container
                  shop-by-category__img-container--${to.slice(1)}`}
              >
                <img
                  src={img}
                  alt={name}
                  className={`shop-by-category__img
                    shop-by-category__img-${to.slice(1)}`}
                />
              </div>

              <h3 className="shop-by-category__name">{name}</h3>
            </Link>

            <p className="shop-by-category__quantity">
              {`${getProductsLength(to.slice(1) as ProductCategory)} models`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
