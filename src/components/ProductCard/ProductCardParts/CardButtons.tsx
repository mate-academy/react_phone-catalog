import { useContext } from 'react';
import { ProductsContext } from '../../../ProductsContext';
import { Product } from '../../../types/Product';

type Props = {
  product: Product
};

export const CardButtons: React.FC<Props> = ({ product }) => {
  const {
    favProducts,
    setFavProducts,
    cart,
    setCart,
  } = useContext(ProductsContext);

  const isFavourite = favProducts.some(
    favProduct => favProduct.id === product.id,
  );

  const isCartItem = cart.some(
    cartitem => cartitem.id === product.id,
  );

  const removeFromCart = () => {
    setCart(cart.filter(cartItem => cartItem.id !== product.id));
  };

  const addToCart = () => {
    setCart([...cart, { ...product, quantity: 1 }]);
  };

  const handleFavorites = () => {
    setFavProducts(isFavourite
      ? favProducts.filter(favProduct => favProduct.id !== product.id)
      : [...favProducts, product]);
  };

  return (
    <p className="buttons">
      {isCartItem ? (
        <button
          type="button"
          className="
          button
          p-0
          card-footer-item
          has-background-white
          has-text-success
         "
          onClick={removeFromCart}
        >
          Added to cart
        </button>
      ) : (
        <button
          type="button"
          className="
          button
          p-0
          card-footer-item
          has-background-dark
          has-text-light
         "
          onClick={addToCart}
        >
          Add to cart
        </button>
      )}
      <button
        type="button"
        className="button"
        onClick={handleFavorites}
      >
        <span className="icon">
          {isFavourite ? (
            <i className="fa-solid fa-heart has-text-danger-dark" />
          ) : (
            <i className="fa-regular fa-heart" />
          )}
        </span>
      </button>
    </p>
  );
};
