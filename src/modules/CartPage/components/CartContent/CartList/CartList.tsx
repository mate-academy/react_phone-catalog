import type { CartProduct } from '../../../../shared/types/Product';
import { CartItem } from '../CartItem';

import styels from './CartList.module.scss';

type Props = {
  cartProducts: CartProduct[];
}

export const CartList = ({cartProducts}: Props) => {
  return (
    <div className={styels.cartList}>
      {cartProducts.map(product => (
        <CartItem key={product.id} product={product}/>
      ))}
    </div>
  )
}
