import { useContext } from 'react';
import { CartStoreContext } from '../../../Store/CartStore';
import { UpdatedProduct } from '../../shared/Types/types';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line max-len
import { PrimaryButton } from '../../shared/Shared_Components/ActionButtons/PrimaryButton';
import classNames from 'classnames';
import { DarkModeContext } from '../../../Store/StoreThemeMode';

export const CartCheckout = () => {
  const { cartList } = useContext(CartStoreContext);
  const { isDark } = useContext(DarkModeContext);
  const navigate = useNavigate();

  const totalPrice = cartList.reduce((acc, cur: UpdatedProduct) => {
    return cur.discount
      ? acc + cur.price * cur.quantity
      : acc + cur.fullPrice * cur.quantity;
  }, 0);

  const totalItems = cartList.reduce((acc, cur: UpdatedProduct) => {
    return acc + cur.quantity;
  }, 0);

  return (
    <div
      className={classNames('cart__checkout', {
        'cart__checkout--dark': isDark,
      })}
    >
      <div
        className={classNames('cart__price', { 'cart__price--dark': isDark })}
      >
        <h1 className="title title--h1">{`$${totalPrice}`}</h1>

        <p className="body-text">{`Total for ${totalItems} ${totalItems === 1 ? 'item' : 'items'}`}</p>
      </div>

      <PrimaryButton
        title="Checkout"
        onClickHandler={() => {
          navigate('/checkout');
        }}
        height={48}
      />
    </div>
  );
};
