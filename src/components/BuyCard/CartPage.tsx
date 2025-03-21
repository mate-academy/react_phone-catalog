import { useState } from 'react';
import back from '../../../image/back.svg';
import { ByCardItem } from '../ByCardItem/ByCardItem';
import { useInfoHook } from '../ProductInformation/InfoHook';
import { ProductDetails } from '../../types/ProductTypes';

export const CardPage = () => {
  const { navigate } = useInfoHook();

  const [cart, setCart] = useState<ProductDetails[]>([]);

  return (
    <main className="main__phonepage">
      <h1 className="title">
        <div className="productInfolink__back">
          <img src={back} alt="back__link" onClick={() => navigate(-1)} />
          <p
            className="productInfolink__backTitle"
            onClick={() => navigate(-1)}
          >
            Back
          </p>
        </div>
      </h1>
      <h1 className="page__title">Cart</h1>

      {cart.length > 0 ? (
        cart.map(product => <ByCardItem key={product.id} product={product} />)
      ) : (
        <p>Your cart is empty</p>
      )}
    </main>
  );
};
