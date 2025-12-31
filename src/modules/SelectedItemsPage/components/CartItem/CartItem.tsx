import { ProductWithQuantity } from '../../../shared/types/Product';
import IconClose from '../../../shared/icons/iconClose.svg?react';
import styles from './CartItem.module.scss';
import { Price } from '../../../../components/Price';
import { ButtonWithIcon } from '../../../../components/ButtonWithIcon';
import { useContext } from 'react';
import { CartContext } from '../../../shared/context/CartContext';

interface CartItemProps {
  selectProduct: ProductWithQuantity;
}

export const CartItem = ({ selectProduct }: CartItemProps) => {
  const { removeFromCart, changeQuantity } = useContext(CartContext);

  return (
    <div className={styles.cart}>
      <div className={styles.cart__info}>
        <IconClose onClick={() => removeFromCart(selectProduct.itemId)} />
        <img
          className={styles.cart__image}
          src={selectProduct.image}
          alt="selectProduct"
        />
        <p className={styles.cart__title}>{selectProduct.name}</p>
      </div>
      <div className={styles.cart__controls}>
        <div className={styles.cart__buttons}>
          <ButtonWithIcon
            iconName="minus"
            onClick={() => changeQuantity(selectProduct.itemId, -1)}
            disabled={selectProduct.quantity === 1}
          />
          <p className={styles.cart__count} style={{ color: '#000000' }}>
            {selectProduct.quantity}
          </p>
          <ButtonWithIcon
            iconName="plus"
            onClick={() => changeQuantity(selectProduct.itemId, +1)}
          />
        </div>
        <div className={styles.cart__price}>
          <Price
            price={selectProduct.price * selectProduct.quantity}
            levelTitleSize={'price-small'}
            levelTitle={3}
          />
        </div>
      </div>
    </div>
  );
};
