import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../utils/Context';

export const TopActions = () => {
  const { cartList, favourites } = useContext(Context);

  return (
    <div className="top-actions">
      <Link to="/favourites" className="icon icon-info">
        {favourites.length > 0
        && <div className="icon-info__info">{favourites.length}</div>}

        <img src="assests/images/Favourites.svg" alt="heart icon" />
      </Link>

      <Link to="/cart" className="icon icon-info">
        {cartList.length > 0
        && <div className="icon-info__info">{cartList.length}</div>}

        <img src="assests/images/Cart.svg" alt="cart icon" />
      </Link>

    </div>
  );
};
