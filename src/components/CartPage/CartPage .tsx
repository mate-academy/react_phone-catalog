import React from 'react';
import './CartPage.scss';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import cn from 'classnames/bind';
import { getItems } from '../../store/index';
import { removeFromCart, setQuantity, clearCart } from '../../store/cart';
import { setPriceWithDiscount } from '../../helpers/setPriceWithDiscount';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';

const CartPage = () => {
  const itemsCart = useSelector(getItems);
  const dispatch = useDispatch();
  const getTotalItem = () => {
    return itemsCart.reduce((sum, { quantity }) => sum + quantity, 0);
  };

  const getTotalPriceWithDiscount = () => {
    return itemsCart.reduce((sum, { quantity, product }) => (
      sum + quantity * setPriceWithDiscount(product)
    ), 0);
  };

  return (
    <div className="CartPage">
      <Breadcrumbs />
      <div className="CartPage__ContainerInner">
        {itemsCart && (
          <ul className="Cart__List">
            {itemsCart.map(item => (
              <li key={item.product.id} className="CartItem">
                <button
                  type="button"
                  className="CartItem__Btn RemoveBtn"
                  aria-label="Remove Button"
                  onClick={() => dispatch(removeFromCart(item.product))}
                />
                <div className="CartItem__Photo-Container">
                  <img alt="card" src={item.product.imageUrl} className="CartItem__Photo" />
                </div>
                <p className="CartItem__TitleProduct">{item.product.name}</p>

                <div className="CartItem__Quantity-Containar">
                  <button
                    type="button"
                    aria-label="Subtract button"
                    disabled={item.quantity <= 1}
                    className={cn('CartItem__Btn Subtract-btn',
                      {
                        'Subtract-btn--disabled': item.quantity <= 1,
                      })}
                    onClick={() => dispatch(setQuantity(item.product, item.quantity - 1))}
                  />

                  <div className="CartItem__Counter">{item.quantity}</div>
                  <button
                    type="button"
                    aria-label="Add button"
                    className="CartItem__Btn Add-btn"
                    onClick={() => dispatch(setQuantity(item.product, item.quantity + 1))}
                  />

                </div>
                <div className="CartItem__Prise">
                  <span className="Prise">
                    $
                    {setPriceWithDiscount(item.product) * item.quantity}
                  </span>
                  {item.product.discount !== 0 && (
                    <span className="Prise OldPrise">
                      $
                      {item.product.price * item.quantity}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>

        )}
        {itemsCart.length > 0 ? (
          <section className="TotalCost ">
            <p className="TotalCost__Prise">
              $
              {getTotalPriceWithDiscount()}
            </p>
            <p className="TotalCost__Checkout">
              Total for
              {' '}
              {getTotalItem()}
              {' '}
              items
            </p>
            <div className="TotalCost__Btn">
              <Link
                to="/checkout"
                className="TotalCost__Link"
                onClick={() => dispatch(clearCart())}
              >
                Checkout
              </Link>

            </div>
          </section>
        )
          : (
            <div className="IntermediatePage">
              <h1 className="IntermediatePage__Title">
                Cart is empty :(
              </h1>
              <div className="IntermediatePage__Btn">
                <Link
                  to="/phones"
                  className="IntermediatePage__Link"
                >
                  {' '}
                  Go to shop
                </Link>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default CartPage;
