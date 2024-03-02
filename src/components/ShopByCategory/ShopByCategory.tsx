import React, { useEffect } from 'react';
import './ShopByCategory.scss';
import { Link, useLocation } from 'react-router-dom';
import { Product } from '../../type/Product';

type Props = {
  products: Product[],
};

export const ShopByCategory: React.FC<Props> = ({ products }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const phones = products.filter(product => product.category === 'phones');
  const tablets = products.filter(product => product.category === 'tablets');
  const accessories = products.filter(
    product => product.category === 'accessories',
  );

  return (
    <div className="category">
      <h1 className="category__title">
        Shop by category
      </h1>

      <div
        className="category__block-links"
        data-cy="categoryLinksContainer"
      >
        <Link
          to="/phones"
          className="category__link"
        >
          <div
            // eslint-disable-next-line max-len
            className="category__image-block category__image-block--phones"
          >
            <img
              className="category__image category__image--phones"
              // eslint-disable-next-line max-len
              src="https://mate-academy.github.io/react_phone-catalog/_new/img/category-phones.png"
              alt="Category phones"
            />
          </div>
          <h3 className="category__name">
            Mobile phones
          </h3>
          <p className="category__number">
            {phones.length}
          </p>
        </Link>
        <Link
          to="/tablets"
          className="category__link"
        >

          <div className="category__image-block category__image-block--tablets">
            <img
              className="category__image category__image--tablets"
              // eslint-disable-next-line max-len
              src="https://mate-academy.github.io/react_phone-catalog/_new/img/category-tablets.png"
              alt="Category tablets"
            />
          </div>
          <h3 className="category__name">
            Tablets
          </h3>
          <p className="category__number">
            {tablets.length}
          </p>
        </Link>
        <Link
          to="/accessories"
          className="category__link"
        >
          <div
            className="category__image-block category__image-block--accessories"
          >
            <img
              className="category__image category__image--accessories"
              // eslint-disable-next-line max-len
              src="https://mate-academy.github.io/react_phone-catalog/_new/img/category-accessories.png"
              alt="Category accessories"
            />
          </div>
          <h3 className="category__name">
            Accessories
          </h3>
          <p className="category__number">
            {accessories.length}
          </p>
        </Link>
      </div>
    </div>
  );
};
