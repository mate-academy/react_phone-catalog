import { useContext } from 'react';
import { ProductsContext } from '../../Context/ProductsContext';

import s from './CartPage.module.scss';
import { CartItem } from './components/CartItem';

export const CartPage = () => {
  const { cartProds } = useContext(ProductsContext);
  const totalSumm = cartProds.reduce(
    (sum, product) => sum + product.fullPrice,
    0,
  );

  return (
    <div className="container ">
      <h2 className="title is-1">Cart</h2>
      <p className="mb-6">{cartProds.length} items</p>
      {/*
      <div className="columns">
        {cartProds.map(product => (
          <div className="column is-one-quarter" key={product.id}>
            <ProductCard key={product.id} product={product} />
          </div>
        ))}
      </div> */}

      <div className="columns">
        <div className="column is-two-thirds">
          {cartProds.map(product => (
            <CartItem key={product.id} product={product} />
          ))}
        </div>
        <div className="column is-one-third">
          <p>$ {totalSumm}</p>
          <p>
            Total for {cartProds.length} item{cartProds.length === 1 ? '' : 's'}
          </p>
          <p>_____________________</p>
          <button className={`${s.checkout_button}`} type="button">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};
