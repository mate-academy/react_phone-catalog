import { useState } from 'react';
import { Link } from 'react-router-dom';

import { ProductType } from '../../api/getProducts';

import { Product } from '../../types/Phone';

import { CloseIcon, MinusIcon, PlusIcon } from '../../utils/Icons';
import {
  addProductToCart,
  getAmountOfProducts,
  removeProductFromCart,
} from '../../utils/localeStorage';
import { generateUrlPath } from '../../utils/generateUrlPath';

interface CardProductProps {
  product: Product;
  handleDelete: (id: string) => void;
  updateProductAmount: (productId: string, newAmount: number) => void;
}

const CartProduct: React.FC<CardProductProps> = ({
  product, handleDelete, updateProductAmount,
}) => {
  const {
    id,
    name,
    price,
    imageUrl,
    type,
  } = product;
  const [
    currentAmount, setCurrentAmount,
  ] = useState<number>(getAmountOfProducts(id));

  const handleRemove = () => {
    removeProductFromCart(id);
    setCurrentAmount(currentAmount - 1);
    updateProductAmount(id, currentAmount - 1);
  };

  const handleIncreaseAmount = () => {
    addProductToCart(id);
    setCurrentAmount(currentAmount + 1);
    updateProductAmount(id, currentAmount + 1);
  };

  return (
    <article key={id} className="cart__product">
      <div
        className="cart__product--wrapper"
      >
        <button
          type="button"
          className="cart__product--close-button"
          onClick={() => handleDelete(id)}
          data-cy="cartDeleteButton"
        >
          <CloseIcon />
        </button>

        <Link
          to={`/${generateUrlPath(type as ProductType)}/${id}`}
          className="cart__product--link"
        >
          <img
            src={imageUrl}
            alt={name}
            className="cart__product--photo"
          />

          <p className="cart__product--name">{name}</p>
        </Link>
      </div>

      <div className="cart__product--side-panel">
        <div className="cart__product--amount-control">
          <button
            type="button"
            className="cart__product--amount-button slider-button"
            onClick={() => handleRemove()}
            disabled={currentAmount === 1}
          >
            <MinusIcon color={currentAmount === 1 ? '#E2E6E9' : '#313237'} />
          </button>

          <p
            className="cart__product--products-amount"
            data-cy="productQauntity"
          >
            {currentAmount}
          </p>

          <button
            type="button"
            className="cart__product--amount-button slider-button"
            onClick={() => handleIncreaseAmount()}
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
