import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ProductsContext } from '../../../ProductsContext';

export const CartAndFavButtons = () => {
  const { productId = '' } = useParams();
  const {
    products,
    favProducts,
    setFavProducts,
    cart,
    setCart,
  } = useContext(ProductsContext);
  const currentProduct = products.filter(
    product => product.id === productId,
  )[0];
  const isFavourite = favProducts.some(x => x.id === currentProduct?.id);
  const isCartItem = cart.some(
    cartitem => cartitem.id === currentProduct?.id,
  );

  return (
    <p className="buttons">
      {isCartItem ? (
        <button
          type="button"
          className="
          button
          card-footer-item
          has-background-white
          has-text-success
         "
          onClick={() => {
            setCart(cart.filter(cartItem => cartItem.id !== currentProduct.id));
          }}
        >
          Added to cart
        </button>
      ) : (
        <button
          type="button"
          className="
          button
          card-footer-item
          has-background-dark
          has-text-light
         "
          onClick={() => {
            setCart([...cart, currentProduct]);
          }}
        >
          Add to cart
        </button>
      )}
      <button
        type="button"
        className="button"
        onClick={() => {
          setFavProducts(isFavourite
            ? favProducts.filter(x => x.id !== currentProduct.id)
            : [...favProducts, currentProduct]);
        }}
      >
        <span className="icon is-small">
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
