import { FC } from 'react';
import { useAppContext } from '../../../context/AppContext';
import { ProductInCart } from '../../../types/ProductInCart';
import { ButtonBack } from '../../Parts/ButtonBack/ButtonBack';
import { CartItem } from '../../Parts/CartItem/CartItem';
import './Cart.scss';
import { Link } from 'react-router-dom';

type Props = {
  products: ProductInCart[];
};

export const Cart: FC<Props> = ({ products }) => {
  const { inCartCount } = useAppContext();

  const totalSum = products.reduce(
    (acc: number, el: ProductInCart) => acc + el.price * el.count,
    0,
  );

  return (
    <div className="cart">
      <div className="cart__container">
        <div className="cart__navigate">
          <ButtonBack />
        </div>

        <h2 className="cart__title title">Cart</h2>
        {inCartCount === 0 ? (
          <h2 className="cart__not-res">
            Cart&apos;s feeling empty.
            <br />
            Shop now for awesome deals and fill up your cart with tech goodness!
          </h2>
        ) : (
          <>
            <div className="cart__content">
              <div className="cart__products">
                {products.map(product => (
                  <CartItem key={product.id} product={product} />
                ))}
              </div>
              <div className="cart__total-box">
                <div className="cart__info">
                  <h2 className="cart__total-price">{`$${totalSum}`}</h2>
                  <p className="cart__total-count">{`Total for ${inCartCount} items`}</p>
                </div>

                <Link to="order" className="cart__button">
                  Checkout
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
