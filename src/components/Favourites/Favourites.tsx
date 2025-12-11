import { useContext } from 'react';
import './Favourites.scss';
import { DevicesContext } from '../../DevicesContext';
import homeIcon from '../../images/icons/home-icon.png';
import arrowRight from '../../images/icons/arrow-right.png';
import { ProductCard } from '../ProductCard/ProductCard';
import { Link } from 'react-router-dom';

export const Favourites = () => {
  const context = useContext(DevicesContext);

  if (!context) {
    return <div>Loading...</div>;
  }

  const { favourites } = context;

  return (
    <div className="favourites">
      <div className="adress">
        <Link to={'/'} className="adress__home-icon">
          <img src={homeIcon} className="adress__home-icon__image" />
        </Link>

        <div className="adress__arrow-right">
          <img src={arrowRight} className="adress__arrow-right__image" />
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
