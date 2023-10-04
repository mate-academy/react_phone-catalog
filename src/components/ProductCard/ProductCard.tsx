import { Link } from 'react-router-dom';
import { useCart, useProducts } from 'context';
import { Button, Like } from 'components/ui-kit';
import { ButtonType, Product } from 'types';
import './ProductCard.scss';
import { AppRoutes } from 'config';

type Props = {
  product: Product,
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    favourites,
    setFavourites,
  } = useProducts();

  const { cart, addToCart } = useCart();

  const {
    name,
    image,
    fullPrice,
    price,
    ram,
    capacity,
    screen,
    phoneId,
    itemId,
  } = product;

  const handleFavourite = () => {
    const isProductInFavourites = favourites
      .some(favProduct => favProduct.itemId === itemId);

    if (isProductInFavourites) {
      const deleteFromFavs = favourites
        .filter(favProduct => favProduct.itemId !== itemId);

      setFavourites(deleteFromFavs);
    } else {
      setFavourites([...favourites, product]);
    }
  };

  const existInFavourites = favourites
    .some(likedProduct => likedProduct.itemId === product.itemId);

  const existProductInCart = cart.some(item => item.itemId === itemId);

  const addItemToCart = () => {
    if (!existProductInCart) {
      const newItem = {
        ...product,
        cartQuantity: 1,
      };

      addToCart([...cart, newItem]);

      return null;
    }

    const productIndexInCart = cart
      .findIndex(cartProduct => cartProduct.itemId === product.itemId);

    if (productIndexInCart !== -1) {
      const newCart = [...cart];

      newCart[productIndexInCart] = {
        ...cart[productIndexInCart],
        cartQuantity: cart[productIndexInCart].cartQuantity + 1,
      };

      addToCart(newCart);
    }

    return null;
  };

  return (
    <div
      className="product-card"
    >
      <Link
        to={`${AppRoutes.Phones}/${phoneId}`}
        className="product-card__link"
      >
        <img
          className="product-card__img"
          alt={name}
          src={image}
        />

        <h3 className="product-card__name">{name}</h3>
      </Link>

      <div className="product-card__price-block">
        <p className="product-card__price-w-discount">{`$${price}`}</p>
        <p className="product-card__price">{`$${fullPrice}`}</p>
      </div>

      <div className="product-card__specs">
        <p>Screen</p>
        <p className="product-card__specs--right">{screen}</p>
        <p>Capacity</p>
        <p className="product-card__specs--right">{capacity}</p>
        <p>RAM</p>
        <p className="product-card__specs--right">{ram}</p>
      </div>

      <div className="product-card__buttons-block">
        <Button
          buttonType={ButtonType.CartSmall}
          onClickHandler={addItemToCart}
          disabled={existProductInCart}
          existInCart={existProductInCart}
        />

        <Like
          onClickHandler={handleFavourite}
          liked={existInFavourites}
        />
      </div>
    </div>
  );
};
