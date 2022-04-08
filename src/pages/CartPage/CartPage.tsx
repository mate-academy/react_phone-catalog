import { FunctionComponent, useContext, useState } from 'react';

// Styles
import './CartPage.scss';

// Contexts
import { CartContext } from '../../contexts/CartProvider';

// Types
import { Product } from '../../types/Product';

// Components
import { NoResults } from '../../components/NoResults';
import { BackButton } from '../../components/BackButton';
import { CartList } from '../../components/CartList';
import { Total } from '../../components/Total';

export const CartPage: FunctionComponent = () => {
  const { cart } = useContext(CartContext);
  const products = JSON.parse(localStorage.getItem('products') || '[]');
  const cartProducts = products.filter((product: Product) => cart.includes(product.id));

  const getTotalSum = () => {
    return cartProducts.reduce((sum: number, product: Product) => {
      return sum + product.newPrice;
    }, 0);
  };

  const [totalSum, setTotalSum] = useState<number>(getTotalSum());

  return !cart[0] ? (
    <NoResults type="" />
  ) : (
    <>
      <BackButton />

      <h1 className="CartPage__title">Cart</h1>

      <div className="CartPage__content">
        <CartList products={cartProducts} setTotalSum={setTotalSum} />

        <Total totalSum={totalSum} productsCount={cartProducts.length} />
      </div>
    </>
  );
};
