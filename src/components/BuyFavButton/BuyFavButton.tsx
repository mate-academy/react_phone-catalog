import { useState, useEffect, useContext } from 'react';
import classNames from 'classnames';
import '../../scss/blocks/addToCartButtons.scss';
import { Product } from '../../types/Product';
import { CartContext } from '../CartContext/CartContext';
import { CartItem } from '../../types/CartItem';
import { FavContext } from '../FavContext/FavContext';

type Props = {
  product: Product;
};
export const BuyFavButton: React.FC<Props> = ({ product }) => {
  const [isAddedToCart, setIsAddedToCard] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { cartProducts, addToCart } = useContext(CartContext);
  const { favProducts, addToFav } = useContext(FavContext);

  const addedToCard = () => {
    if (cartProducts === null) {
      setIsAddedToCard(false);

      return;
    }

    const isAdded = cartProducts
      .some((prod: CartItem) => prod.id === product?.id);

    setIsAddedToCard(isAdded);
  };

  const addedToFavorite = () => {
    if (favProducts === null) {
      setIsFavorite(false);

      return;
    }

    const isAdded = favProducts
      .some((prod: Product) => prod.id === product?.id);

    setIsFavorite(isAdded);
  };

  useEffect(() => {
    addedToCard();
    addedToFavorite();
  }, [cartProducts, favProducts]);

  return (
    <div className="addToCartButtons">
      <button
        type="button"
        className={classNames(
          'addToCartButtons__buy',
          { 'addToCartButtons__buy--added': isAddedToCart },
        )}
        onClick={() => addToCart(product)}
      >
        {`${!isAddedToCart ? 'Add' : 'Added'} to cart`}
      </button>
      <button
        data-cy="addToFavorite"
        type="button"
        className={classNames(
          'addToCartButtons__like',
          'button',
          { 'addToCartButtons__like--selected': isFavorite },
        )}
        onClick={() => addToFav(product)}
      >
        &nbsp;
      </button>
    </div>
  );
};
