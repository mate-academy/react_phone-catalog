import classNames from 'classnames'
import { FC } from 'react'
import { useAppSelector } from '../../app/hooks';
import { Product } from '../../types/product';
import './addProductButtons.scss';

interface Props {
  addToCart: (prod: Product) => void;
  addToFavorites: (prod: Product) => void;
  product: Product;
  longVersion?: boolean;
}

export const AddProductButtons: FC<Props> = ({ addToCart, addToFavorites, product, longVersion }) => {
  const theme = useAppSelector(state => state.theme.value);
  const favoriteProducts
  = useAppSelector(state => state.favoriteProducts.value);
  const shoppingCart = useAppSelector(state => state.shoppingCart.value);
  const favoriteButtonIsClicked = favoriteProducts
  .some(pr => pr.id === product.id);
const shoppingCartButtonIsClicked = shoppingCart
  .some(pr => pr.id === product.id);

  const renderFavoriteIcon = () => {
    if (theme === 'light') {
      return (
        <img
          src="/_new/img/icons/favorites-icon-dark.svg"
          alt="Add to favorite"
        />
      );
    }

    return (
      <img
        src="/_new/img/icons/favorites-icon-light.svg"
        alt="Add to favorite"
      />
    );
  };

  return (
    <div className="buttons">
      <button
        type="button"
        onClick={() => addToCart({ ...product, quantity: 1 })}
        className={
          classNames(
            `buttons__add-to-cart buttons__add-to-cart--${theme}`,
            { 'buttons__add-to-cart--long-version': longVersion },
            { 'buttons__add-to-cart--active': shoppingCartButtonIsClicked },
            { [`buttons__add-to-cart--active--${theme}`]: shoppingCartButtonIsClicked },
          )
        }
      >
        {`${!shoppingCartButtonIsClicked ? 'Add to cart' : 'Added to cart'}`}
      </button>

      <button
        type="button"
        onClick={() => addToFavorites(product)}
        className={
          classNames(
            `buttons__liked buttons__liked--${theme}`,
            { 'buttons__liked--long-version': longVersion },
            { 'buttons__liked--active': favoriteButtonIsClicked },
          )
        }
      >
        {!favoriteButtonIsClicked ? (
          renderFavoriteIcon()
        ) : (
          <img
            src="/_new/img/icons/favorites-icon-filled.svg"
            alt="Add to favorite"
          />
        )}
      </button>
    </div>
  )
}
