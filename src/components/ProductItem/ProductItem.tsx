import classNames from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/product';
import './productItem.scss';

interface Props {
  product: Product;
  addToCart: (product: Product) => void;
  addToFavorites: (product: Product) => void;
  favoriteProducts: Product[];
  shoppingCart: Product[];
}

export const ProductItem: FC<Props> = ({
  product, addToCart, addToFavorites, favoriteProducts, shoppingCart,
}) => {
  const {
    category,
    image,
    name,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
  } = product;

  const favoriteButtonIsClicked = favoriteProducts
    .some(pr => pr.id === product.id);
  const shoppingCartButtonIsClicked = shoppingCart
    .some(pr => pr.id === product.id);

  return (
    <div className="product">
      <Link className="product__link" to={`/${category}`}>
        <img className="product__image" src={`_new/${image}`} alt="Phone" />
        <h2 className="product__name">{name}</h2>
      </Link>

      <div className="product__prices">
        <p className="product__price">{`$${price}`}</p>
        <p className="product__full-price">{`$${fullPrice}`}</p>
      </div>

      <div className="product__info">
        <div className="product__info-block">
          <p className="product__info-title">Screen</p>
          <p className="product__info-value">{screen}</p>
        </div>
        <div className="product__info-block">
          <p className="product__info-title">Capacity</p>
          <p className="product__info-value">{capacity}</p>
        </div>
        <div className="product__info-block">
          <p className="product__info-title">RAM</p>
          <p className="product__info-value">{ram}</p>
        </div>
      </div>

      <div className="product__buttons">
        <button
          type="button"
          onClick={() => addToCart(product)}
          className={
            classNames(
              'product__add-to-card',
              { 'product__add-to-card--active': shoppingCartButtonIsClicked },
            )
          }
        >
          {`${!shoppingCartButtonIsClicked ? 'Add to card' : 'Added to card'}`}
        </button>
        <button
          type="button"
          onClick={() => addToFavorites(product)}
          className={
            classNames(
              'product__liked',
              { 'product__liked--active': favoriteButtonIsClicked },
            )
          }
        >
          {!favoriteButtonIsClicked ? (
            <img
              src="/_new/img/icons/favorites-icon.svg"
              alt="Add to favorite"
            />
          ) : (
            <img
              src="/_new/img/icons/favorites-icon-filled.svg"
              alt="Add to favorite"
            />
          )}
        </button>
      </div>
    </div>
  );
};
