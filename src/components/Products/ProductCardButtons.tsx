import classNames from 'classnames';
import { useContext } from 'react';
import { Product } from '../../types/Product';
import {
  CartProducts,
  FavoritesProducts,
} from '../context/SavedProductsContext';

type Props = {
  product: Product;
};

export const ProductCardButtons: React.FC<Props> = ({ product }) => {
  const favsIcon = '/img/icons/favs.png';
  const favsIconAdded = '/img/icons/favsAdd.png';

  const { favoritesProducts, setFavoritesProducts }
  = useContext(FavoritesProducts);

  const { cartProducts, setCartProducts } = useContext(CartProducts);

  const isInFavorite
= () => favoritesProducts.find(item => item.id === product.id);

  const isInCart = () => cartProducts.find(item => item.id === product.id);

  const addToFavorite = () => {
    if (isInFavorite()) {
      setFavoritesProducts(favoritesProducts.filter(p => p.id !== product.id));
    } else {
      setFavoritesProducts([...favoritesProducts, product]);
    }
  };

  const addToCart = () => {
    if (isInCart()) {
      setCartProducts(cartProducts.filter(p => p.id !== product.id));
    } else {
      setCartProducts([...cartProducts, product]);
    }
  };

  return (
    <>
      <div className="product-content__card__buttons">
        <button
          className={classNames('product-content__card__buttons-cart', {
            'product-content__card__buttons-cart-isAdded': isInCart(),
          })}
          type="button"
          onClick={addToCart}
        >
          {isInCart() ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          data-cy="addToFavorite"
          className="product-content__card__buttons-favorites"
          type="button"
          onClick={addToFavorite}
        >
          <img
            src={isInFavorite() ? favsIconAdded : favsIcon}
            alt="favorite"
          />

        </button>
      </div>
    </>
  );
};
