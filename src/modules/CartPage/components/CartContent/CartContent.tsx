import { Breadcrumbs } from '../../../shared/components/Breadcrumbs';
import { CartHeader } from '../CartHeader';
import { useAppSelector } from '../../../../app/store/hooks';
import { EmptyCart } from '../EmptyCart';
import classNames from 'classnames';
import { PriceBlock } from './PriceBlock';
import { CartList } from './CartList';

import styles from './CartContent.module.scss';

export const CartContent = () => {
  const cartProducts = useAppSelector(state => state.cart.items);

  return (
    <>
      <Breadcrumbs pageName={'cart'} />
      <CartHeader />
      <div className={classNames(styles.content, 'grid')}>
        {cartProducts.length > 0 ? <CartList cartProducts={cartProducts}/> : <EmptyCart />}
        {cartProducts.length > 0 ? <PriceBlock /> : null}
      </div>
    </>
  );
};
