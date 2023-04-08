import { useState } from 'react';
import { Product } from '../../Types/Product';
import './ProductCart.scss';

type Props = {
  product: Product,
  onDelete: (value: Product, count: number) => void,
  setSum: (prev: any) => void,
};

export const ProductCart: React.FC<Props> = ({ product, onDelete, setSum }) => {
  const [count, setCount] = useState(1);

  const decres = (price: number) => {
    setSum((prev: any) => prev + price);
    setCount(prev => prev + 1);
  };

  const incres = (productData: Product, counter: number) => {
    if (count > 0) {
      setSum((prev: any) => prev - productData.price);
      setCount(prev => prev - 1);
    }

    if (count === 0) {
      onDelete(product, counter);
    }
  };

  return (
    <div className="productCart">
      <button
        type="button"
        className="productCart__button--cross"
        onClick={() => onDelete(product, count)}
      >
        x
      </button>

      <img src={`_new/${product.image}`} alt="Product" className="productCart__img" />

      <span className="productCart__name">{product.name}</span>

      <div className="productCart__counter">
        <button
          type="button"
          onClick={() => decres(product.price)}
          className="productCart__button"
        >
          +
        </button>

        <p>{count}</p>

        <button
          type="button"
          onClick={() => incres(product, count)}
          className="productCart__button"
        >
          -
        </button>
      </div>

      <span className="productCart__price">
        {`$${product.price}`}
      </span>
    </div>
  );
};
