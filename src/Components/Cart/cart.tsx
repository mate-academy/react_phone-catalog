import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CartCard from '../CartCard/cartcard';
import useProducts from '../useproducts/useProducts';
import { useCartContext } from '../cartcontext/cartcontext';
import './cart.scss';
import { Product } from '../ProductCard/types';

interface CartProduct {
  // eslint-disable-next-line react/no-unused-prop-types
  id: string;
  // eslint-disable-next-line react/no-unused-prop-types
  quantity: number;
}

const Cart: React.FC = () => {
  const { cartProducts, removeFromCart } = useCartContext();
  const [total, setTotal] = useState<number>(0);
  const products: Product[] = useProducts();
  const [showModal, setShowModal] = useState(false);

  const handleRemoveFromCart = (productId: string) => {
    removeFromCart(productId);
  };

  const calculateTotalItems = () => {
    const totalItems = cartProducts.reduce(
      (acc: number, { quantity }: { quantity: number }) => acc + quantity,
      0,
    );

    return totalItems;
  };

  const calculateTotal = () => {
    const calculatedTotal = cartProducts.reduce(
      (acc: number, { id, quantity }: CartProduct) => {
        const foundProduct = products.find(
          (item: Product) => item.id === id,
        );

        if (foundProduct) {
          const productTotal = foundProduct.price * quantity;

          return acc + productTotal;
        }

        return acc;
      }, 0,
    );

    setTotal(calculatedTotal);
  };

  useEffect(() => {
    calculateTotal();
  }, [cartProducts, products]);

  const handleCheckoutClick = () => {
    if (showModal) {
      setShowModal(false);
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      <div className="product-div">
        <div className="page-back__holder">
          <img
            src={`${process.env.PUBLIC_URL}/img/Chevron-left.svg`}
            alt="Chevron"
            className="folder-chevron"
          />
          <Link className="page-back" to="/">
            Back
          </Link>
        </div>
        <h3 className="title">Cart</h3>
        <div className="cart-holder">
          {cartProducts.length > 0 ? (
            <div className="cart-cards">
              {cartProducts.map(({ id }: CartProduct) => (
                <CartCard
                  key={id}
                  productId={id}
                  onRemoveFromCart={handleRemoveFromCart}
                />
              ))}
            </div>
          ) : (
            <p>You have no items in cart.</p>
          )}
          <div
            className="total"
            style={
              { border: cartProducts.length > 0 ? '1px solid #000' : 'none' }
            }
          >
            {cartProducts.length > 0 ? (
              <>
                <div className="total-money">
                  $
                  {total.toFixed(2)}
                </div>
                <div className="total-total">
                  Total for your
                  {' '}
                  {calculateTotalItems()}
                  {' '}
                  {calculateTotalItems() === 1 ? 'item' : 'items'}
                </div>
                <div className="line total" />
                <button
                  type="button"
                  className="checkout"
                  onClick={handleCheckoutClick}
                >
                  Checkout
                </button>

                {showModal && (
                  <div className="modal">
                    <div className="modal-content">
                      <p className="modal-text">
                        Sorry, the checkout functionality is not implemented yet
                      </p>
                    </div>
                  </div>
                )}
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
