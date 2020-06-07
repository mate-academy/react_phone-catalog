import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Heading } from '../components/Heading/Heading';
import { SECTION_HEADINGS, SHOWCASE_HEADINGS } from '../common/constants';
import { ShowcaseBlock } from '../components/ShowcaseBlock/ShowcaseBlock';
import { BackBtn } from '../components/Buttons/BackBtn';
import { getCart } from '../redux';
import { CartItem } from '../components/Header/Cart/CartItem';
import { CartTotal } from '../components/Header/Cart/CartTotal';

export const CartPage = () => {
  const cart = useSelector(getCart);
  const filledCart = useMemo(() => cart.length > 0, [cart]);

  return (
    <div className="container">
      <section className="section">
        {filledCart
          ? (
            <>
              <BackBtn />
              <Heading title={SECTION_HEADINGS.cart} />
              <div className="cart__content-container">
                <div className="cart__list">
                  {cart.map((product) => (
                    <CartItem key={product.id} {...product} />
                  ))}
                </div>
                <CartTotal />
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
}
