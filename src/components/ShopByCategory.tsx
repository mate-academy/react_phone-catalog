import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../utils/hooks/hooks';
import { getProductsCount } from '../utils/helpers/getProductsCount';

import '../styles/blocks/shopByCategory.scss';

export const ShopByCategory = () => {
  const { products } = useAppSelector((state) => state.products);

  const phonesCount = useMemo(
    () => getProductsCount(products, 'phones'),
    [products],
  );

  const tabletsCount = useMemo(
    () => getProductsCount(products, 'tablets'),
    [products],
  );

  const accessoriesCount = useMemo(
    () => getProductsCount(products, 'accessories'),
    [products],
  );

  return (
    <section className="section">
      <h2 className="section__title">Shop by category</h2>

      <div className="category" data-cy="categoryLinksContainer">
        <div className="category__wrapper">
          <Link to="phones">
            <div className="category__photo category__photo--phones">
              <img
                src="./_new/img/category-phones.png"
                alt="phones category"
                className="category__image category__image--phones"
              />
            </div>
          </Link>

          <h3 className="category__title">Mobile phones</h3>
          <p className="category__text">{`${phonesCount} models`}</p>
        </div>

        <div className="category__wrapper">
          <Link to="tablets">
            <div className="category__photo category__photo--tablets">
              <img
                src="./_new/img/category-tablets.png"
                alt="tablets category"
                className="category__image category__image--tablets"
              />
            </div>
          </Link>

          <h3 className="category__title">Tablets</h3>
          <p className="category__text">{`${tabletsCount} models`}</p>
        </div>

        <div className="category__wrapper">
          <Link to="accessories">
            <div className="category__photo category__photo--accessories">
              <img
                src="./_new/img/category-accessories.png"
                alt="accessories category"
                className="category__image category__image--accessories"
              />
            </div>
          </Link>

          <h3 className="category__title">Accessories</h3>
          <p className="category__text">{`${accessoriesCount} models`}</p>
        </div>
      </div>
    </section>
  );
};
