/* eslint-disable max-len */
import classNames from 'classnames';
import { useContext } from 'react';

import { CartContext } from '../../store/CartContext';
import { FavouritesProductsContext } from '../../store/FavouritesContext';
import { Product } from '../../types/Product';
import './ButtonForCard.scss';

type Props = {
  product: Product;
};

export const ButtonForCard: React.FC<Props> = ({ product }) => {
  const { setFavouritesProducts, favouritesProducts } = useContext(FavouritesProductsContext);
  const { setProductsInCart, productsInCart } = useContext(CartContext);

  const isAddedInFavourite = favouritesProducts.some(item => item.id === product.id);
  const isAddedInCart = productsInCart.some(item => item.id === product.id);

  const handleClickFavorite = () => {
    if (isAddedInFavourite) {
      setFavouritesProducts(favouritesProducts.filter(item => item.id !== product.id));
    } else {
      setFavouritesProducts([...favouritesProducts, product]);
    }
  };

  const handleClickAddToCart = () => {
    if (isAddedInCart) {
      setProductsInCart(productsInCart.filter(item => item.product.id !== product.id));
    } else {
      setProductsInCart([...productsInCart, { id: product.id, quantity: 1, product }]);
    }
  };

  return (
    <div className="card-buttons card-buttons__content">
      <button
        type="button"
        className={classNames('card-buttons__button-add-to-cart', {
          'card-buttons__button-add-to-cart--clicked': isAddedInCart,
        })}
        onClick={handleClickAddToCart}
      >
        Add to cart
      </button>

      <button
        data-cy="addToFavorite"
        type="button"
        className={classNames('button button__favorite', {
          'button__favorite--clicked': isAddedInFavourite,
        })}
        onClick={handleClickFavorite}
      >
        add to favorite
      </button>
    </div>
  );
};
