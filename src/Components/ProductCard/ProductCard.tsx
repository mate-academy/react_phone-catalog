import { Link } from 'react-router-dom';
import fav from '../../images/fav/Icons/Favourites (Heart Like).svg';
import { useCart } from '../../Context/Context';
import { Products } from '../../types/Products';
import classNames from 'classnames';
import { useFav } from '../../Context/FavouritesContext';
import activeFav from '../../images/icons/ActiveFav.svg';

type Props = {
  product: Products;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { addToFav, removeFromFav, isInFav } = useFav();
  const addedFav = isInFav(String(product.id));

  const { addToCart, isInCart, removeFromCart } = useCart();
  const added = isInCart(String(product.id));
  const buttonClass = classNames('products-cart', {
    'products-cart-active': added,
  });

  return (
    <div className="page__models-buttons">
      <button
        className={buttonClass}
        onClick={() =>
          added ? removeFromCart(String(product.id)) : addToCart(product)
        }
      >
        <Link to={`/product/${product.id}`} className="products-cart__link">
          <p className="products-cart__text">
            {added ? 'Added' : 'Add to cart'}
          </p>
        </Link>
      </button>

      <button
        className="products-fav"
        onClick={() =>
          addedFav ? removeFromFav(String(product.id)) : addToFav(product)
        }
      >
        {addedFav ? (
          <img className="products-fav__img" src={activeFav} alt="Favourites" />
        ) : (
          <img className="products-fav__img" src={fav} alt="Favourites" />
        )}
      </button>
    </div>
  );
};
