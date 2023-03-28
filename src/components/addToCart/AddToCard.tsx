import classNames from 'classnames';
import { useContext, useEffect, useState } from 'react';
import { setLocalStorageItem } from '../../helpers/util';
import { GlobalContext } from '../../reducer';
import { Product } from '../../types/product';
import { ShoppingProduct } from '../../types/shoppingProduct';

import './addToCart.scss';

type Props = {
  product:Product
};

export const AddToCart: React.FC<Props> = ({ product }) => {
  const [state, dispatch] = useContext(GlobalContext);
  const [selected, setSelected] = useState(false);

  const addProductToBasket = (item:Product) => {
    if (!state.basketList
      .some((el: ShoppingProduct) => el.item === item)) {
      dispatch({ type: 'addBasket', product: { item, value: 1 } });
      setLocalStorageItem('shoppingList',
        [...state.basketList, { item, value: 1 }]);
    }
  };

  const remove = () => {
    const list: ShoppingProduct [] | [] = JSON
      .parse(localStorage.getItem('shoppingList') as string) || [];

    if (list.length) {
      setLocalStorageItem('shoppingList', list
        .filter((el: ShoppingProduct) => el.item.age !== product.age));
    }
  };

  const removeProductCard = () => {
    dispatch({ type: 'removeProductInBasket', age: product.age });
    remove();
  };

  useEffect(() => {
    setSelected(state.basketList
      .some((el: ShoppingProduct) => el.item.age === product.age));
  }, [state.basketList, state.selectedProduct]);

  return (
    <button
      type="button"
      className={classNames('card-button', {
        selected,
      })}
      onClick={() => (selected
        ? removeProductCard()
        : addProductToBasket(product))}
    >
      { selected ? 'Added to cart' : 'Add to cart' }
    </button>
  );
};
