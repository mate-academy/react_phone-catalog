import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';

type Props = {
  product: Product
  changeQuantity: (prod: Product, q: number) => void;
};

export const CartQuantity: React.FC<Props> = ({ product, changeQuantity }) => {
  const { quantity } = product;

  const [productQauntity, setProductQauntity]
  = useState(quantity && quantity > 0 ? quantity : 1);

  useEffect(() => {
    changeQuantity(product, productQauntity);
  }, [productQauntity]);

  return (
    <div className="cart-list__products__quantity">

      <button
        className="cart-list__products__quantity__button"
        type="button"
        onClick={() => setProductQauntity(prev => prev - 1)}
        disabled={productQauntity === 1}
      >
        -
      </button>

      <p
        data-cy="productQauntity"
        className="cart-list__products__quantity__number"
      >
        {quantity}
      </p>

      <button
        className="cart-list__products__quantity__button"
        data-cy="cartDeleteButton"
        type="button"
        onClick={() => setProductQauntity(prev => prev + 1)}
      >
        +
      </button>
    </div>
  );
};
