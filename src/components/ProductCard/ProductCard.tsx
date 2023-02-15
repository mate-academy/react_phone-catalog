import classNames from 'classnames';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../CartContext';
import { FavContext } from '../../FavContext';
import { Product } from '../../types/Product';
import './ProductCard.scss';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { favourites, setFavourites } = useContext(FavContext);
  const { cartItems, setCartItems } = useContext(CartContext);

  const addItem = (productId: string) => {
    if (cartItems.some((item: { id: string; }) => item.id === product.id)) {
      return setCartItems(cartItems.filter(item => item.id !== productId));
    }

    return setCartItems([
      ...cartItems,
      {
        id: product.id,
        quantity: 1,
        name: product.name,
        image: product.imageUrl,
        price: product.price,
        discount: product.discount,
      },
    ]);
  };

  const linkTo = (productItem: Product) => {
    if (productItem.type === 'phone') {
      return `/phones/${productItem.id}`;
    }

    if (productItem.type === 'tablet') {
      return `/tablets/${productItem.id}`;
    }

    if (productItem.type === 'accessories') {
      return `/accessories/${productItem.id}`;
    }

    return '';
  };

  return (
    <div data-cy="cardsContainer" className="productCard">
      <Link className="productCard__imageLink" to={linkTo(product)}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="productCard__image"
        />
      </Link>

      <Link className="productCard__title" to={linkTo(product)}>
        {product.name}
      </Link>

      <div className="productCard__prices">
        {product.discount > 0
          ? (
            <>
              <p className="productCard__price">
                {`$${product.price - product.price * (product.discount / 100)}`}
              </p>

              <p className="productCard__oldPrice">{`$${product.price}`}</p>
            </>
          )
          : <p className="productCard__price">{`$${product.price}`}</p>}
      </div>

      <div className="productCard__info">
        <div className="productCard__characteristic">
          Screen
          <p className="productCard__value">
            {product.screen || 'Not specified'}
          </p>
        </div>

        <div className="productCard__characteristic">
          Capacity
          <p className="productCard__value">
            {product.capacity || 'Not specified'}
          </p>
        </div>

        <div className="productCard__characteristic">
          RAM
          <p className="productCard__value">{product.ram || 'Not specified'}</p>
        </div>
      </div>

      <div className="productCard__buttons">
        <button
          type="button"
          className={classNames(
            'productCard__addToCart', {
              'productCard__addToCart--added':
                cartItems.some(
                  (item: { id: string; }) => item.id === product.id,
                ),
            },
          )}
          name={product.id}
          onClick={(item) => addItem(item.currentTarget.name)}
        >
          Add to cart
        </button>

        <button
          type="button"
          className={classNames(
            'productCard__addToFavourites', {
              'productCard__addToFavourites--added':
                favourites.includes(product.id),
            },
          )}
          name={product.id}
          data-cy="addToFavorite"
          onClick={(e) => (
            !favourites.includes(product.id)
              ? setFavourites([
                ...favourites,
                e.currentTarget.name])
              : setFavourites(favourites.filter(item => item !== product.id))
          )}
        >
          {favourites.includes(product.id)
            ? (
              <img
                src="../../img/addedToFavourites.svg"
                alt="addedToFavourites"
              />
            )
            : <img src="../../img/favourites.svg" alt="addToFavourites" />}
        </button>
      </div>
    </div>
  );
};
