import classNames from 'classnames';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../reducer';
import { Product } from '../../types/product';

import './addToCart.scss';

type Props = {
  product:Product
};

export const AddToCart:React.FC<Props> = ({ product }) => {
  const [state, dispatch] = useContext(GlobalContext);
  const [selected, setSelected] = useState(false);

  const addProductToBasket = (item:Product) => {
    if (!state.basketList
      .some((el:{ item:Product, value: number }) => el.item === item)) {
      dispatch({ type: 'addBasket', product: { item, value: 1 } });
      localStorage
        .setItem(
          'shoppingList',
          JSON.stringify([...state.basketList, { item, value: 1 }]),
        );
    }
  };

  useEffect(() => {
    if (state.basketList
      .some((el:
      { item:Product, value: number }) => el.item.age === product.age)) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [state.basketList, state.selectedProduct]);

  return (
    <button
      type="button"
      className={classNames('card-button', {
        selected,
      })}
      onClick={() => addProductToBasket(product)}
    >
      { selected ? 'Added to cart' : 'Add to cart' }
    </button>
  );
};
