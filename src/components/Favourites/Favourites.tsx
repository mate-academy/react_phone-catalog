import { useContext } from 'react';
import './Favourites.scss';
import { DevicesContext } from '../../DevicesContext';
import homeIcon from '../../images/icons/home-icon.png';
import arrowRight from '../../images/icons/arrow-right.png';
import { ProductCard } from '../ProductCard/ProductCard';

export const Favourites = () => {
  const context = useContext(DevicesContext);

  if (!context) {
    return <div>Loading...</div>;
  }

  const { accessories } = context;
  const favourites = [...accessories].slice(0, 5);

  return (
    <div className="favourites">
      <div className="adress">
        <div className="adress__home-icon">
          <img src={homeIcon} className="address__home-icon__image" />
        </div>
        <div className="adress__arrow-right">
          <img
            src={arrowRight}
            className="phones__address__arrow-right-icon__image"
          />
        </div>
        <div className="adress__favourites">Favourites</div>
      </div>
      <div className="favourites__title">Favourites</div>
      <div className="favourites__quantity-of-favourites">{`${favourites.length} items`}</div>
      <div className="block-items">
        {favourites.map(model => (
          <ProductCard model={model} key={model.id} />
        ))}
      </div>
    </div>
  );
};
