import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../utils/Context';

export const TopActions = () => {
  const { cartList, favourites } = useContext(Context);

  return (
    <div className="top-actions">
      <div className="icon icon-info">
        {favourites.length > 0
        && <div className="icon-info__info">{favourites.length}</div>}
        <Link to="/favourites">
          <img src="assests/images/Favourites.svg" alt="heart icon" />
        </Link>
      </div>
      <div className="icon icon-info">
        {cartList.length > 0
        && <div className="icon-info__info">{cartList.length}</div>}
        <Link to="/cart">
          <img src="assests/images/Cart.svg" alt="cart icon" />
        </Link>
      </div>
    </div>
  );
};
