/* eslint-disable @typescript-eslint/no-use-before-define */
import { FC, useReducer } from 'react';
import { Product } from '../../types/Product';
import { useAppDispatch } from '../../app/hooks';
import {
  unsetFromCardPhone, setInCardPhone,
} from '../../features/PhonesInCard/phonesInCardSlice';

type Props = {
  product: Product,
  onTotalAmount: React.Dispatch<React.SetStateAction<number>>
};

function reducer(
  state: {
    count: number,
  },
  action: {
    type: string,
  },
) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

export const CardedProduct: FC<Props> = ({
  product,
  onTotalAmount,
}) => {
  const initialState = { count: 1 };
  const [state, dispatcher] = useReducer(reducer, initialState);
  const dispatch = useAppDispatch();

  const handleUnsetProduct = (good: Product) => {
    dispatch(unsetFromCardPhone(good));
    onTotalAmount(prev => (prev - (state.count * product.price)));
  };

  const handleCounter = (actionType: string) => {
    switch (actionType) {
      case 'decrement':
        if (state.count > 1) {
          onTotalAmount(prev => (prev - +product.price));
          dispatcher({ type: actionType });
          dispatch(unsetFromCardPhone(product));
        }

        break;
      case 'increment':
        onTotalAmount(prev => (prev + +product.price));
        dispatcher({ type: actionType });
        dispatch(setInCardPhone(product));
        break;
      default:
        break;
    }
  };

  return (
    <>
      <button
        className="item-ored__delete-button"
        type="button"
        onClick={() => handleUnsetProduct(product)}
      >
        <img
          className="item-ored__delete-button--icon"
          src="images/icons/CloseButton.svg"
          alt="Close"
        />
      </button>
      <img
        className="item-ored__product-img"
        src={product.image || product.imageUrl}
        alt="Phone"
      />
      <h2 className="item-ored__product-name">
        {product.name}
      </h2>
      <button
        className="item-ored__product-count-deg"
        type="button"
        onClick={() => handleCounter('decrement')}
      >
        -
      </button>
      <p className="item-ored__count-value">{state.count}</p>
      <button
        type="button"
        className="item-ored__product-count-inc"
        onClick={() => handleCounter('increment')}
      >
        +
      </button>
      <p className="item-ored__price-product">{`$${product.price}`}</p>
    </>
  );
};
