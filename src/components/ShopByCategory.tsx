import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Product } from '../types/Product';
import '../styles/shopByCategory.scss';

type Props = {
  products: Product[],
};

export const ShopByCategory: FC<Props> = ({ products }) => {
  const phonesList = products.filter(product => product.type === 'phone');
  const tabletList = products.filter(product => product.type === 'tablet');
  const accessoriesList
  = products.filter(product => product.type === 'accessories');

  return (
    <div className="category container">
      <h2 className="category__title">Shop by category</h2>
      <div className="category__content">
        <div className="category__item">
          <NavLink
            to="/phones"
            className="category__item-link"
            onClick={() => {
              window.scrollTo({ top: 0 });
            }}
          />
          <div
            className="category__item-image category__item-image--phones"
          />
          <h2 className="category__item-title">Mobile phones</h2>
          <p className="category__item-count">{`${phonesList.length} models`}</p>
        </div>
        <div className="category__item">
          <NavLink
            to="/tablets"
            className="category__item-link"
            onClick={() => {
              window.scrollTo({ top: 0 });
            }}
          />
          <div
            className="category__item-image category__item-image--tablets"
          />
          <h2 className="category__item-title">Tablets</h2>
          <p className="category__item-count">{`${tabletList.length} models`}</p>
        </div>
        <div className="category__item">
          <NavLink
            to="/accessories"
            className="category__item-link"
            onClick={() => {
              window.scrollTo({ top: 0 });
            }}
          />
          <div
            className="category__item-image category__item-image--accessories"
          />
          <h2 className="category__item-title">Accessories</h2>
          <p className="category__item-count">{`${accessoriesList.length} models`}</p>
        </div>
      </div>
    </div>
  );
};
