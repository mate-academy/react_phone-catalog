import { useNavigate } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';
import { ProductsTypes } from '../../types/ProductsTypes';
import { useContext } from 'react';
import { FavouritesContext } from '../../context/FavouritesContext';
import { Product } from '../../types/Product';
import classNames from 'classnames';
import { CartContext } from '../../context/CartContext';

type Props = {
  product: Product;
  productType: ProductsTypes | string;
};

export const ProductCard: React.FC<Props> = ({ product, productType }) => {
  const navigate = useNavigate();
  const {
    id,
    images,
    name,
    priceRegular,
    priceDiscount,
    screen,
    capacity,
    ram,
  } = product;

  const image = images[0];

  const handleNavigate = () => {
    navigate(`/${productType}/` + id);
  };

  const { favourites, setFavourites } = useContext(FavouritesContext);
  const { cart, setCart } = useContext(CartContext);

  const handleAddFavourite = () => {
    if (favourites.filter(fav => fav.id === product.id).length > 0) {
      setFavourites(favourites.filter(fav => fav.id !== product.id));
    } else {
      setFavourites([...favourites, product]);
    }
  };

  const handleAddToCart = () => {
    if (cart.filter(crt => crt.id === product.id).length <= 0) {
      setCart([...cart, { ...product, count: 1 }]);
    } else {
      setCart(cart.filter(crt => crt.id !== product.id));
    }
  };

  return (
    <div className="card">
      <img
        className="card__image"
        src={`${process.env.PUBLIC_URL}/${image}`}
        alt="product"
        onClick={handleNavigate}
      />
      <p onClick={handleNavigate} className="card__title body-text">
        {name} <br />
      </p>
      <div className="card__prices">
        {priceDiscount ? (
          <Fragment>
            <h3 className="card__price">{priceDiscount}$</h3>
            <p className="card__old-price">{priceRegular}$</p>
          </Fragment>
        ) : (
          <h3 className="card__price">{priceRegular}$</h3>
        )}
      </div>
      <div className="card__info">
        <div className="card__info-item">
          <p className="card__info-param small-text">Screen</p>
          <p className="card__info-value small-text">{screen}</p>
        </div>
        <div className="card__info-item">
          <p className="card__info-param small-text">Capacity</p>
          <p className="card__info-value small-text">{capacity}</p>
        </div>
        <div className="card__info-item">
          <p className="card__info-param small-text">RAM</p>
          <p className="card__info-value small-text">{ram}</p>
        </div>
      </div>
      <div className="card__buttons">
        <button
          className={classNames('card__button button', {
            'button-disabled':
              cart.filter(crt => crt.id === product.id).length > 0,
          })}
          onClick={handleAddToCart}
        >
          {cart.filter(crt => crt.id === product.id).length > 0
            ? 'Added to cart'
            : 'Add to cart'}
        </button>
        <button
          className={classNames('card__favourite favourite-button', {
            'favourite-button--active':
              favourites.filter(fav => fav.id === product.id).length > 0,
          })}
          onClick={handleAddFavourite}
        ></button>
      </div>
    </div>
  );
};
