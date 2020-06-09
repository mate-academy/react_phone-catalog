import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Heading } from '../components/Heading/Heading';
import { SECTION_HEADINGS, SHOWCASE_HEADINGS } from '../common/constants';
import { ShowcaseBlock } from '../components/ShowcaseBlock/ShowcaseBlock';
import { BackBtn } from '../components/Buttons/BackBtn';
import { getCartItems } from '../redux';
import { CartItem } from '../components/Cart/CartItem';
import { CartTotal } from '../components/Cart/CartTotal';

export const CartPage = () => {
  const cartItems = useSelector(getCartItems);
  const filledCart = useMemo(() => cartItems.length > 0, [cartItems]);

  return (
    <div className="container">
      <section className="section">
        {filledCart
          ? (
            <>
              <BackBtn />
              <Heading title={SECTION_HEADINGS.cart} />
              <div className="cart__content-container">
                <ul className="cart__items">
                  {cartItems.map((product) => (
                    <CartItem key={product.id} {...product} />
                  ))}
                </ul>
                <CartTotal
                  cartItems={cartItems}
                />
              </div>
            </>
          )
          : (
            <>
              <p className="section__no-favorites-info">
                Cart is empty.
                <br />
                Please, take a look at our new models.
              </p>
              <ShowcaseBlock title={SHOWCASE_HEADINGS.newModels} />
            </>
          )}
      </section>
    </div>
  );
};
