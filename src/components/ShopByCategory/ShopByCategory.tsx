import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../store/AppProvider';

import './ShopByCategory.scss';
import { getAccessories, getPhones, getTablets } from '../../api/products';

export const ShopByCategory = () => {
  const { products } = useContext(AppContext);
  const phones = getPhones(products);
  const tablets = getTablets(products);
  const accessories = getAccessories(products);

  return (
    <div className="ShopByCategory ShopByCategory__container">
      <h1 className="ShopByCategory__title">Shop by category</h1>

      <div data-cy="categoryLinksContainer" className="ShopByCategory__list">
        <Link to="/phones" className="ShopByCategory__item">
          <div className="ShopByCategory__item__image img--phones" />
          <h3 className="ShopByCategory__item__title">Mobile phones</h3>
          <p className="ShopByCategory__item__info">
            {`${phones.length} models`}
          </p>
        </Link>

        <Link to="/tablets" className="ShopByCategory__item">
          <div className="ShopByCategory__item__image img--tablets" />
          <h3 className="ShopByCategory__item__title">Tablets</h3>
          <p className="ShopByCategory__item__info">
            {`${tablets.length} models`}
          </p>
        </Link>

        <Link to="/accessories" className="ShopByCategory__item">
          <div className="ShopByCategory__item__image img--accessories" />
          <h3 className="ShopByCategory__item__title">Accessories</h3>
          <p className="ShopByCategory__item__info">
            {`${accessories.length} models`}
          </p>
        </Link>
      </div>
    </div>
  );
};
