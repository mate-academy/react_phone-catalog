import { FC, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { CartItem } from '../../components/CartItem.tsx';
import { ProductInCart } from '../../types/ProductInCart';
import { Modal } from '../../components/Modal';
import { ButtonBack } from '../../components/ButtonBack';
import './cart.scss';

type Props = {
  products: ProductInCart[];
};

export const Cart: FC<Props> = ({ products }) => {
  const { inCartCount } = useAppContext();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const totalSum = products.reduce(
    (acc: number, el: ProductInCart) => acc + el.price * el.count,
    0,
  );

  return (
    <div className="cart">
      <div className="cart__container">
        <div className="cart__navigate">
        &nbsp;
          <ButtonBack />
        </div>

        <h2 className="cart__title title">Cart</h2>
        {inCartCount === 0 ? (
          <h2 className="cart__not-res">Your cart is empty</h2>
        ) : (
          <>
            <div className="cart__content">
              <div className="cart__products">
                {products.map((product) => (
                  <CartItem key={product.id} product={product} />
                ))}
              </div>
              <div className="cart__total-box">
                <div className="cart__info">
                  <h2 className="cart__total-price">{`$${totalSum}`}</h2>
                  <p className="cart__total-count">{`Total for ${inCartCount} items`}</p>
                </div>

                <button
                  type="button"
                  className="cart__button button"
                  onClick={() => {
                    setIsOpenModal(true);
                    localStorage.clear();
                  }}
                >
                  Checkout
                </button>
                {isOpenModal && (
                  <div className="cart__modal">
                    <Modal setIsOpenModal={setIsOpenModal} />
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
