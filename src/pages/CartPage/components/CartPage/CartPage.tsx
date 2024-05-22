import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../../../context/AppContext';
import { CartItem } from '../CartItem';
import { BackLink } from '../../../shared/components/BackLink';
import './CartPage.scss';
import { CartProduct } from '../../../../types/CartProduct';

export const CartPage: React.FC = () => {
  const [products, setProducts] = useState<CartProduct[]>([]);

  const { cartProducts } = useContext(CartContext);

  useEffect(() => {
    const newProducts: CartProduct[] = [];

    for (const key in cartProducts) {
      newProducts.push({
        product: cartProducts[key].product,
        quantity: cartProducts[key].quantity,
      });
    }

    setProducts(newProducts);
  }, [cartProducts]);

  return (
    <div>
      <section>
        <BackLink />
        <h1>Cart</h1>
      </section>

      {!!products.length && (
        <section>
          {products.map((item: CartProduct) => {
            return (
              <div style={{ display: 'flex' }} key={item.product.id}>
                <CartItem product={item.product} quantity={item.quantity} />
              </div>
            );
          })}
          <hr />
          Total:{' '}
          {products.reduce((sum, currentCartProduct: CartProduct) => {
            return (
              sum +
              currentCartProduct.product.price * currentCartProduct.quantity
            );
          }, 0)}
        </section>
      )}
    </div>
  );
};
