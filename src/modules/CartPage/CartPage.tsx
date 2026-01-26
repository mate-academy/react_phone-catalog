import { useContext } from 'react';
import { ProductsContext } from '../../Context/ProductsContext';

import { CartItem } from './components/CartItem';
import s from './CartPage.module.scss';
import { Breadcrumb } from '../../components/Breadcrumb';

export const CartPage = () => {
  const { cartProds } = useContext(ProductsContext);
  const totalSumm = cartProds.reduce(
    (sum, product) => sum + product.fullPrice * product.quantity,
    0,
  );

  return (
    <div className="container ">
      <Breadcrumb />

      <h2 className="title is-1">Cart</h2>
      <p className="mb-6">{cartProds.length} items</p>

      <div className="columns">
        <div className="column is-two-thirds">
          {cartProds.map(product => (
            <CartItem key={product.id} product={product} />
          ))}
        </div>
        <div className="column is-narrow has-text-centered">
          <div className={`box ${s.box}`}>
            <div className={`${s.bottom_bordered}`}>
              <p className="title is-3 mb-0">$ {totalSumm}</p>
              <p className={`${s.box__text}`}>
                Total for {cartProds.length} item
                {cartProds.length === 1 ? '' : 's'}
              </p>
            </div>
            <button className={`${s.checkout_button}`} type="button">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
