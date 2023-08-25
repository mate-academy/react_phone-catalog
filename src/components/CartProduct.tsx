import { useState } from 'react';
import { Product } from '../types/Phone';
import { CloseIcon, MinusIcon, PlusIcon } from '../utils/Icons';
import {
  LocaleDataTypes,
  addProductToCart,
  getAmountOfProducts,
  removeProductFromCart,
} from '../utils/localeStorage';

interface CardProductProps {
  product: Product;
  setStorage: (id: string, data: LocaleDataTypes) => void;
  setVisibleProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  updateProductAmount: (productId: string, newAmount: number) => void;
}

const CartProduct: React.FC<CardProductProps> = ({
  product, setStorage, setVisibleProducts, updateProductAmount,
}) => {
  const { id, name, price } = product;
  const [
    currentAmount, setCurrentAmount,
  ] = useState<number>(getAmountOfProducts(id));

  return (
    <article key={id} className="cart__product">
      <div className="cart__product--wrapper">
        <button
          type="button"
          className="cart__product--close-button"
          onClick={() => {
            setStorage(id, LocaleDataTypes.CART);
            setVisibleProducts((prevProds) => [...prevProds].filter(
              (prevProduct) => prevProduct.id !== id,
            ));
          }}
          data-cy="cartDeleteButton"
        >
          <CloseIcon />
        </button>
        <img
          src="https://placehold.co/66x66"
          alt=""
          className="cart__product--photo"
        />
        <p className="cart__product--name">{name}</p>
      </div>

      <div className="cart__product--side-panel">
        <div className="cart__product--amount-control">
          <button
            type="button"
            className="cart__product--amount-button"
            onClick={() => {
              removeProductFromCart(id);
              setCurrentAmount(currentAmount - 1);
              updateProductAmount(id, currentAmount - 1);
            }}
            disabled={currentAmount === 1}
          >
            <MinusIcon color="#E2E6E9" />
          </button>

          <p
            className="cart__product--products-amount"
            data-cy="productQauntity"
          >
            {currentAmount}
          </p>

          <button
            type="button"
            className="cart__product--amount-button"
            onClick={() => {
              addProductToCart(id);
              setCurrentAmount(currentAmount + 1);
              updateProductAmount(id, currentAmount + 1);
            }}
          >
            <PlusIcon />
          </button>
        </div>
        <p className="cart__product--price">
          $
          {price}
        </p>
      </div>
    </article>
  );
};

export default CartProduct;
