import { Link } from 'react-router-dom';
import './UserActions.scss';

export const UserActions = () => {
  return (
    <div className="user-actions">
      <Link to="/favourites" className="user-actions__icon">
        <img src="img/icons/heart.svg" alt="Favourites" />
      </Link>

      <Link to="/cart" className="user-actions__icon">
        <img src="img/icons/cart.svg" alt="Cart" />
      </Link>
    </div>
  );
};
