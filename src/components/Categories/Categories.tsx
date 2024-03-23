import React, { useContext } from 'react';
import './Categories.scss';
import { StateContext } from '../../store/ProductsContext';

export const Categories: React.FC = () => {
  const { products } = useContext(StateContext);

  const phoneAmount = products.filter(p => p.category === 'phones').length;
  const tabletAmount = products.filter(p => p.category === 'tablet').length;
  const accessoriesAmount = products.filter(
    p => p.category === 'accessor',
  ).length;

  return (
    <div className="Categories">
      <h2 className="Categories__title">Shop by category</h2>
      <div className="Categories__box" data-cy="categoryLinksContainer">
        <a href="#/" className="Categories__card">
          <div className="Categories__card-image">
            <img
              src="images/category-phones.png"
              alt=""
              className="Categories__card-photo Categories__card-photo--phone"
            />
          </div>
          <h3 className="Categories__card-name">Mobile phones</h3>
          <p className="Categories__card-text">{`${phoneAmount} models`}</p>
        </a>
        <a href="#/" className="Categories__card">
          <div className="Categories__card-image">
            <img
              src="images/category-tablets.png"
              alt=""
              className="Categories__card-photo Categories__card-photo--tablet"
            />
          </div>
          <h3 className="Categories__card-name">Tablets</h3>
          <p className="Categories__card-text">{`${tabletAmount} models`}</p>
        </a>

        <a href="#/" className="Categories__card">
          <div className="Categories__card-image">
            <img
              src="images/category-accessories.png"
              alt=""
              className="
              Categories__card-photo Categories__card-photo--accessor"
            />
          </div>
          <h3 className="Categories__card-name">Accessories</h3>
          <p className="Categories__card-text">{`${accessoriesAmount} models`}</p>
        </a>
      </div>
    </div>
  );
};
