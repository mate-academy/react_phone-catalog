import { useEffect, useState } from "react";
import './Button.scss';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { actions as favActions } from '../../features/favSlice';
import { actions as cartActions, removeProduct } from '../../features/cartSlice';
import { ThemeVars } from "../../types/themeTypes";
import Favorites from '../../images/homePage/Favorites.svg';
import redHeart from '../../images/homePage/redHeart.svg';
import Heart_dark from '../../images/homePage/Heart_dark.svg';
import Heart_blue from '../../images/homePage/Heart_blue.svg';
import Heart_purple from '../../images/homePage/Heart_purple.svg';
import Heart_orange from '../../images/homePage/Heart_orange.svg';
import { Product } from "../../types/product";

type Props = {
  product: Product;
  detailsPage?: boolean;
}

export const Button: React.FC<Props> = ({ product, detailsPage }) => {
  const dispatch = useAppDispatch();

  const favProducts = useAppSelector(state => state.favourites.favProducts);
  const cartProducts = useAppSelector(state => state.cartItems.cartProducts);

  const [clicked, setClicked] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const favProd = favProducts.find(prod => prod.itemId === product.itemId);

    if (favProd) {
      setClicked(true);
    }
  }, [favProducts, product, setClicked]);

  useEffect(() => {
    const cartProd = cartProducts.find(prod => prod.product === product);

    if (cartProd) {
      setPressed(true);
    }
  }, [cartProducts, product, setPressed]);

  const handleFavClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    prod: Product,
  ) => {
    event.preventDefault();

    if (clicked === false) {
      dispatch(favActions.addProduct(prod));
      setClicked(true);
    }

    if (clicked === true) {
      dispatch(favActions.removeProduct(prod));
      setClicked(false);
    }
  };

  const handleCartClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    prod: Product,
  ) => {
    event.preventDefault();

    if (pressed === false) {
      dispatch(cartActions.addProduct(prod));
      setPressed(true);
    }

    if (pressed === true) {
      dispatch(removeProduct(prod.id));
      setPressed(false);
    }
  };

  const theme = useAppSelector(state => state.themeSwitcher.theme);

  const styleCartButton = () => {
    return pressed
      ? `card__buttons__add__pressed theme-${theme}`
      : `card__buttons__add__noPressed theme-${theme}`
  }

  const styleFavoriteButton = () => {
    return clicked
      ? `card__buttons__favorite__clicked theme-${theme}`
      : `card__buttons__favorite__noClicked theme-${theme}`
  }

  const handleFavImg = () => {
    if (theme === ThemeVars.DARK) {
      return clicked
        ? redHeart
        : Heart_dark
    } else if (theme === ThemeVars.BLUE) {
      return clicked
        ? Heart_blue
        : Favorites
    } else if (theme === ThemeVars.PURPLE) {
      return clicked
        ? Heart_purple
        : Favorites
    } else if (theme === ThemeVars.ORANGE) {
      return clicked
        ? Heart_orange
        : Favorites
    } else {
      return clicked
        ? redHeart
        : Favorites
    }
  }

  return (
    <div className={`card__buttons ${detailsPage ? 'card__buttons--details' : ''}`}>
      <button
        className={`card__buttons__add ${styleCartButton()}`}
        onClick={event => handleCartClick(event, product)}
      >
        {pressed ? 'Added to cart' : 'Add to cart'}
      </button>
      <button
        className={`card__buttons__favorite ${styleFavoriteButton()}`}
        onClick={event => handleFavClick(event, product)}
      >
        <img
          src={handleFavImg()}
          alt="favorites"
          className="card__buttons__heart"
        />
      </button>
    </div>
  )
}