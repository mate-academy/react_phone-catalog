import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { StatesContext } from '../store/GlobalStateProvider';

export const HeaderIcons = () => {
  const { totalCartItems } = useContext(StatesContext);

  return (
    <div className="header-icons">
      <Link to="/favorites" className="header-icons__link">
        <span className="header-icons__icon header-icons__icon--heart" />
      </Link>

      <Link to="/cart" className="header-icons__link">
        <span className="header-icons__icon header-icons__icon--cart" />

        {totalCartItems > 0 && (
          <span className="header-icons__counter">{totalCartItems}</span>
        )}
      </Link>
    </div>
  );
};
