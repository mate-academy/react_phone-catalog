import { BasketProduct } from '../../../types/BasketProduct';
import { FavoriteProduct } from '../../../types/FavoriteProduct';
import './BurgerFooter.scss';
import { Link } from 'react-router-dom';

type BurgerFooterProps = {
  favorites: FavoriteProduct[];
  baskets: BasketProduct[];
};

const BurgerFooter = ({ favorites, baskets }: BurgerFooterProps) => {
  return (
    <footer className="burger-footer">
      <div className="burger-footer--heart">
        <Link to="/heart" className="burger-footer__icon--heart">
          {favorites.length > 0 && (
            <span className="burger-footer__icon--badge">
              {favorites.length}
            </span>
          )}
        </Link>
      </div>
      <div className="burger-footer--basket">
        <Link to="/basket" className="burger-footer__icon--basket">
          {baskets.length > 0 && (
            <span className="burger-footer__icon--badge">{baskets.length}</span>
          )}
        </Link>
      </div>
    </footer>
  );
};

export default BurgerFooter;
