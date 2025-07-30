import './ProductCard.scss';

import { ButtonAdd } from '../../ui/ButtonAdd';
import { ButtonFavorite } from '../../ui/ButtonFavorite';
import type { Product } from '../../types/products';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { FavoriteContext } from '../../context/FavoriteContext';
import { CartContext } from '../../context/CartContext';
import { useThemeState } from '../../stateManagers/themeState';
import { useTranslationState } from '../../stateManagers/languageState';

interface PropsProductCart {
  product: Product;
  category: string;
}

export const ProductCard: React.FC<PropsProductCart> = ({
  product,
  category,
}) => {
  const { translate } = useTranslationState();
  const { theme } = useThemeState();

  const { productInCart, setProductInCart } = useContext(CartContext);
  const { productInFavorite, setProductInFavorite } =
    useContext(FavoriteContext);

  function addProductInCart(value: Product) {
    setProductInCart(value);
  }

  function addProductInFavorite(value: Product) {
    setProductInFavorite(value);
  }

  const isProductInCart: boolean = productInCart.some(
    (pr) => product.id === pr.id,
  );
  const isProductInFavorite: boolean = productInFavorite.some(
    (pr) => product.id === pr.id,
  );

  return (
    <article
      className={`productCard productCard__container productCard__container--${theme}`}
    >
      <NavLink
        to={`/${category}/${product.itemId}`}
        className="productCard__link-zone"
      >
        <div className="productCard__container-photo">
          <img
            src={product.image}
            alt={product.name}
            className="productCard__photo"
          />
        </div>
        <h2 className="productCard__container-title body-text">
          {product.name}
        </h2>
        <div className="productCard__container-price">
          <h3>{`$${product.price}`}</h3>
          <span className="productCard__price-regular">{`$${product.fullPrice}`}</span>
        </div>
        <hr />
        <div className="productCard__container-specifications">
          <div className="productCard__block">
            <span className="small-text">{translate('screen')}</span>
            <p className="uppercase">{product.screen}</p>
          </div>
          <div className="productCard__block">
            <span className="productCard__info small-text">
              {translate('capacity')}
            </span>
            <p className="uppercase">{product.capacity}</p>
          </div>
          <div className="productCard__block">
            <span className="productCard__info small-text">
              {translate('ram')}
            </span>
            <p className="uppercase">{product.ram}</p>
          </div>
        </div>
      </NavLink>

      <div className="productCard__container-buttons">
        <ButtonAdd
          isActive={isProductInCart}
          onClick={() => addProductInCart(product)}
        />

        <ButtonFavorite
          isActive={isProductInFavorite}
          onClick={() => addProductInFavorite(product)}
        />
      </div>
    </article>
  );
};
