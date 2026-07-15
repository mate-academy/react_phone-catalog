import { useContext, useState } from 'react';
import { CartItem } from '../CartItem';
import style from './CartsList.module.scss';
import { Price } from '../../../../components/Price';
import { CartContext } from '../../../shared/context/CartContext';
import { ErrorContent } from '../../../../components/ErrorContent/ErrorContent';

export const CartsList = () => {
  const { cartProducts, totalPrice, totalQuantity, clearCart } =
    useContext(CartContext);
  const [isMassageShow, setIsMassageShow] = useState<boolean>(false);

  const handleCheckout = () => {
    clearCart();
    setIsMassageShow(true);

    setTimeout(() => {
      setIsMassageShow(false);
    }, 3000);
  };

  if (cartProducts.length === 0) {
    return (
      <>
        <ErrorContent
          loading={false}
          error={false}
          products={0}
          category="card yet"
        />
        {isMassageShow && (
          <div className={style.successPopup}>
            <p>Замовлення успішно оформлено!</p>
            <span
              className={style.successPopup__button}
              onClick={() => {
                setIsMassageShow(false);
              }}
            >
              Закрити
            </span>
          </div>
        )}
      </>
    );
  }

  return (
    <div className={style['carts-content']}>
      <div className={style['carts-content__list']}>
        {cartProducts.map(p => (
          <CartItem selectProduct={p} key={p.id} />
        ))}
      </div>

      <div className={style['carts-content__total']}>
        <div className={style['carts-content__total-price']}>
          <Price price={totalPrice} levelTitle={2} levelTitleSize={1} />
          <p className={style['carts-content__total-label']}>
            {`Total for ${totalQuantity} items`}
          </p>
        </div>
        <button
          className={style['carts-content__total-button']}
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};
