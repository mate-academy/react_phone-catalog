import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { Product } from '../../types/Product';

import './CartItem.scss';
import { Link } from 'react-router-dom';

export const CartItem = () => {
  const { cartProducts, setCartProducts } = useContext(CartContext);

  const handlePlusQuantity = (product: Product) => {
    const updatedCart = cartProducts.map(cartProduct => {
      if (cartProduct.id === product.id) {
        return {
          ...cartProduct,
          quantity: (cartProduct.quantity || 1) + 1,
        };
      }

      return cartProduct;
    });

    setCartProducts(updatedCart);
  };

  const handleMinusQuantity = (product: Product) => {
    const updatedCart = cartProducts.map(cartProduct => {
      if (cartProduct.id === product.id) {
        const newQuantity = Math.max((cartProduct.quantity || 1) - 1, 1);

        return {
          ...cartProduct,
          quantity: newQuantity,
        };
      }

      return cartProduct;
    });

    setCartProducts(updatedCart);
  };

  const handleDeleteCartProduct = (product: Product) => {
    const updatedCart = cartProducts.filter(
      cartProduct => cartProduct.id !== product.id,
    );

    setCartProducts(updatedCart);
  };

  return (
    <>
      {cartProducts.map(product => (
        <div className="cart-item" key={product.id}>
          <div className="cart-item__first-block">
            <button
              className="cart-item__delete-button"
              onClick={() => handleDeleteCartProduct(product)}
            />

            <Link to={`/${product.category}/${product.itemId}`}>
              <img
                className="cart-item__img"
                src={product.image}
                alt={product.name}
              />
            </Link>

            <Link
              to={`/${product.category}/${product.itemId}`}
              className="cart-item__title"
            >
              {product.name}
            </Link>
          </div>

          <div className="cart-item__second-block">
            <div className="cart-item__amount-block">
              <button
                className="cart-item__button-minus"
                onClick={() => handleMinusQuantity(product)}
              />

              <p className="cart-item__quantity">{product.quantity}</p>

              <button
                className="cart-item__button-plus"
                onClick={() => handlePlusQuantity(product)}
              />
            </div>

            <p className="cart-item__sum">
              {`$${
                product.quantity && product.price
                  ? product.quantity * product.price
                  : 0
              }`}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};
