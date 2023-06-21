import classNames from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
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

  const productFeatures = [
    {
      name: 'Screen',
      value: screen,
    },
    {
      name: 'Capacity',
      value: capacity,
    },
    {
      name: 'RAM',
      value: ram,
    }
  ];

  const theme = useAppSelector(state => state.theme.value);
  const favoriteButtonIsClicked = favoriteProducts
    .some(pr => pr.id === product.id);
  const shoppingCartButtonIsClicked = shoppingCart
    .some(pr => pr.id === product.id);

  return (
    <div className={`product product--${theme}`}>
      <Link 
        to={`/${category}`}
        className="product__link"
      >
        <img className="product__image" src={`_new/${image}`} alt="Phone" />
        <h2 className={`product__name product__name--${theme}`}>{name}</h2>
      </Link>

      <div className="product__prices">
        <p className={`product__price product__price--${theme}`}>{`$${price}`}</p>
        <p className="product__full-price">{`$${fullPrice}`}</p>
      </div>

      <div className="product__info">
        {productFeatures.map(feature => (
          <div className="product__info-block" key={feature.name}>
            <p className="product__info-title">{feature.name}</p>
            <p className={`product__info-value product__info-value--${theme}`}>{feature.value}</p>
          </div>
        ))}
      </div>

      <div className="product__buttons">
        <button
          type="button"
          onClick={() => addToCart({...product, quantity: 1})}
          className={
            classNames(
              `product__add-to-card product__add-to-card--${theme}`,
              { 'product__add-to-card--active': shoppingCartButtonIsClicked },
              { [`product__add-to-card--active--${theme}`]: shoppingCartButtonIsClicked },
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
              `product__liked product__liked--${theme}`,
              { 'product__liked--active': favoriteButtonIsClicked },
            )
          }
        >
          {!favoriteButtonIsClicked ? (
            theme === 'light' ? (
              <img
                src="/_new/img/icons/favorites-icon-dark.svg"
                alt="Add to favorite"
              />
            ) : (
              <img
                src="/_new/img/icons/favorites-icon-light.svg"
                alt="Add to favorite"
              />
            )
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
