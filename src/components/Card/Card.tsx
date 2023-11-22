/* eslint-disable max-len */
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import './Card.scss';
import heart from '../../icons/favorite.svg';
import heartAdded from '../../icons/favoriteLiked.svg';
import { Product } from '../../types/productType';
import { CartItem } from '../../types/cartType';

type Props = {
  itemId: string,
  image: string,
  title: string,
  price: number,
  screen: string,
  capacity: string,
  ram: string,
  fullPrice: number,
  setFavorites: React.Dispatch<React.SetStateAction<Product[]>>,
  favorites: Product[],
  product: Product,
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>,
  handleChangeDetailsId: (id: string) => void,
};

export const Card: React.FC<Props> = ({
  itemId,
  image,
  title,
  price,
  screen,
  capacity,
  ram,
  fullPrice,
  setFavorites,
  product,
  favorites,
  cartItems,
  setCartItems,
  handleChangeDetailsId,
}) => {
  const [searchParams] = useSearchParams();
  const isItFavoriteProduct = favorites.find(favorite => (
    favorite.itemId === product.itemId));
  const isCardAdded = cartItems.find(cart => (
    cart.product.itemId === product.itemId
  ));

  const hendleSettingFavorites = (someProduct: Product) => (
    isItFavoriteProduct
      ? setFavorites(prev => prev.filter(item => (
        item.itemId !== someProduct.itemId
      )))
      : setFavorites(prev => [...prev, someProduct])
  );

  const addToCart = (someProduct: Product) => {
    const existingItem = cartItems.find((item) => item.id === +someProduct.id);

    if (!existingItem) {
      setCartItems((prevItems) => (
        [...prevItems, { id: +someProduct.id, quantity: 1, product: someProduct }]
      ));
    }
  };

  return (
    <div
      className="product-card"
    >
      <Link
        className="product-card__link"
        onClick={(event) => {
          event.preventDefault();
          handleChangeDetailsId(itemId);
        }}
        to={{
          pathname: `./${itemId}`,
          search: searchParams.toString(),
        }}
      >
        <img
          src={`_new/${image}`}
          alt="Phone"
          className="product-card__phone-img"
        />
        <h2 className="product-card__title">
          {title}
        </h2>
      </Link>
      <div className="container-price">
        <p className="product-card__price">{`$${price}`}</p>
        {fullPrice > 0 && (
          <p className="product-card__price product-card__price--discount">
            {`$${fullPrice}`}
          </p>
        )}
      </div>
      <dl className="product-card__description-phone description-phone">
        <dt className="description-phone--title">Screen</dt>
        <dd className="description-phone--value">{screen}</dd>
        <dt className="description-phone--title">Capacity</dt>
        <dd className="description-phone--value">{capacity}</dd>
        <dt className="description-phone--title">RAM</dt>
        <dd className="description-phone--value">{ram}</dd>
      </dl>
      <div className="product-card__container">
        <button
          className={classNames('product-card__add-to-card', {
            'product-card__add-to-card--added': isCardAdded,
          })}
          type="button"
          onClick={() => addToCart(product)}
        >
          {isCardAdded
            ? 'Added to cart'
            : 'Add to cart'}

        </button>
        <button
          type="button"
          data-cy="addToFavorite"
          onClick={() => hendleSettingFavorites(product)}
          className="product-card__add-to-favorites "
        >
          <img
            className="add-to-favorites__icon"
            src={isItFavoriteProduct ? heartAdded.toString() : heart.toString()}
            alt="icon"
          />
        </button>
      </div>
    </div>
  );
};
