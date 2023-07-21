import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import {
  getAccessoriesQty,
  getPhonesQty,
  getTabletsQty,
} from '../../helpers/getModelsQty';

import './ShopByCategory.scss';

type Props = {
  products: Product[],
};

export const ShopByCategory: FC<Props> = ({ products }) => {
  const accessoriesQty = getAccessoriesQty(products);
  const phonesQty = getPhonesQty(products);
  const tabletsQty = getTabletsQty(products);

  return (
    <section className="page__section shop-by-category">
      <h1 className="shop-by-category__title">Shop by category</h1>
      <div
        className="shop-by-category__container"
        data-cy="categoryLinksContainer"
      >
        <div className="shop-by-category__card">
          <Link
            to="phones"
            className="shop-by-category__img-link shop-by-category__img-phones"
          />
          <Link to="phones" className="shop-by-category__subtitle-link">
            <h3 className="shop-by-category__subtitle">Mobile phones</h3>
          </Link>
          <span className="shop-by-category__qty">{`${phonesQty} models`}</span>
        </div>

        <div className="shop-by-category__card">
          <Link
            to="tablets"
            className="shop-by-category__img-link shop-by-category__img-tablets"
          />
          <Link to="tablets" className="shop-by-category__subtitle-link">
            <h3 className="shop-by-category__subtitle">Tablets</h3>
          </Link>
          <span className="shop-by-category__qty">{`${tabletsQty} models`}</span>
        </div>

        <div className="shop-by-category__card">
          <Link
            to="accessories"
            className="shop-by-category__img-link
              shop-by-category__img-accessories"
          />
          <Link to="accessories" className="shop-by-category__subtitle-link">
            <h3 className="shop-by-category__subtitle">Accessories</h3>
          </Link>
          <span className="shop-by-category__qty">{`${accessoriesQty} models`}</span>
        </div>
      </div>
    </section>
  );
};
