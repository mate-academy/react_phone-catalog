import { useContext, useState } from 'react';
import { Product } from '../../Types/Product';
import { ProductsContext } from '../ProductsContext/ProductsContext';

import closeImg from '../../img/close.svg';

export const CartProduct = ({ product }: { product: Product }) => {
  const { toggleCart, changeCountOfProducts } = useContext(ProductsContext);
  const [countOfProducts, setCountOfProducts] = useState(1);

  const makeLessProducts = () => {
    if (countOfProducts === 1) {
      return;
    }

    setCountOfProducts(countOfProducts - 1);

    changeCountOfProducts(product, countOfProducts - 1);
  };

  const makeMoreProducts = () => {
    setCountOfProducts(countOfProducts + 1);

    changeCountOfProducts(product, countOfProducts + 1);
  };

  return (
    <div className="cart__item" key={product.itemId}>
      <button
        type="button"
        className="cart__closeBtn"
        onClick={() => toggleCart(product)}
      >
        <img className="cart__closeImg" src={closeImg} alt="closeIcon" />
      </button>

      <img
        className="cart__img"
        src={`https://mate-academy.github.io/react_phone-catalog/_new/${product.image}`}
        alt="item"
      />

      <span className="cart__name">{product.name}</span>

      <div className="cart__quantity">
        <button
          type="button"
          className="cart__minus"
          onClick={makeLessProducts}
        >
          -
        </button>

        <span className="cart__count">{countOfProducts}</span>

        <button type="button" className="cart__plus" onClick={makeMoreProducts}>
          +
        </button>
      </div>

      <span className="cart__price">${product.price}</span>
    </div>
  );
};
