/* eslint-disable max-len */
import { Link } from 'react-router-dom';
import { baseUrl } from '../api/api';
import { typographyStyle } from '../CustomStyles/Typography';
import { CartItem } from '../Types/CartItem';

type Props = {
  cartItem: CartItem;
  increment: () => void;
  decrement: () => void;
  removeProduct: () => void;
};

export const CartItemCard: React.FC<Props> = ({
  cartItem,
  increment,
  decrement,
  removeProduct,
}) => {
  const { product } = cartItem;

  return (
    <div className="flex h-[128px] w-[752px] items-center border border-Elements">
      <button onClick={removeProduct} className="mx-6" type="button">
        <img src="./Icons/Close.svg" alt="" />
      </button>

      <div className="flex h-20 w-20 items-center justify-center">
        <Link to={`/catalogue/${product.category}/${product.itemId}`}>
          <img
            className="h-16 w-16 object-contain"
            src={`${baseUrl}/_new/${product.image}`}
            alt=""
          />
        </Link>
      </div>

      <div className="flex min-h-[42px] grow">
        <Link to={`/catalogue/${product.category}/${product.itemId}`}>
          {product.name}
        </Link>
      </div>

      <div className="flex">
        <button
          className="flex h-8 w-8 items-center justify-center border border-Elements"
          type="button"
          onClick={increment}
        >
          <img src="./Icons/Plus.svg" alt="" />
        </button>

        <div className="flex h-8 w-8 items-center justify-center">
          <p>{cartItem.quantity}</p>
        </div>

        <button
          className="flex h-8 w-8 items-center justify-center border border-Elements"
          type="button"
          onClick={decrement}
        >
          <img src="./Icons/Minus.svg" alt="" />
        </button>
      </div>

      <p className={`w-40 px-[42px] ${typographyStyle.h2}`}>
        $
        {product.price}
      </p>
    </div>
  );
};
