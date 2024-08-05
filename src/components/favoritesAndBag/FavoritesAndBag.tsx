import { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ProductsContext } from '../../context/ProductsContext';

export const FavoritesAndBag = () => {
  const { favorites, cart } = useContext(ProductsContext);
  // const location = useLocation();

  // const [searchParams] = useSearchParams();
  // const location = useLocation();

  const totalCount = useMemo(() => {
    return cart.reduce((sum, currentValue) => sum + currentValue.quantity, 0);
  }, [cart]);

  return (
    <>
      <Link to="/favorites" className="nav__group--icons--border">
        <div className="nav__icon nav__icon--heart" />
        {!!favorites.length && (
          <div className="nav__count-heart">
            <p className="nav__count__text">{favorites.length}</p>
          </div>
        )}
      </Link>

      <Link to="/cart" className="nav__group--icons--border">
        <div className="nav__icon nav__icon--shopping-bag" />
        {!!cart.length && (
          <div className="nav__count-bag">
            <p className="nav__count__text">{totalCount}</p>
          </div>
        )}
      </Link>
    </>
  );
};
