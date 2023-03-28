import classNames from 'classnames';
import { useContext, useEffect, useState } from 'react';
import { getItemLocalStorage, setLocalStorageItem } from '../../helpers/util';
import { addBasket, GlobalContext, removeProductInBasket } from '../../reducer';
import { Product } from '../../types/product';
import { ShoppingProduct } from '../../types/shoppingProduct';

import './addToCart.scss';

type Props = {
  product: Product;
};

export const AddToCart: React.FC<Props> = ({ product }) => {
  const [state, dispatch] = useContext(GlobalContext);
  const [isSelected, setIsSelected] = useState(false);

  const addProductToBasket = (item: Product) => {
    if (!state.basketList.some((el: ShoppingProduct) => el.item === item)) {
      dispatch({ type: addBasket, product: { item, value: 1 } });
      setLocalStorageItem('shoppingList', [
        ...state.basketList,
        { item, value: 1 },
      ]);
    }
  };

  const remove = () => {
    const list: ShoppingProduct[] | []
      = getItemLocalStorage('shoppingList') || [];

    if (list.length) {
      setLocalStorageItem(
        'shoppingList',
        list.filter((el: ShoppingProduct) => el.item.age !== product.age),
      );
    }
  };

  const removeProductCard = () => {
    dispatch({ type: removeProductInBasket, age: product.age });
    remove();
  };

  useEffect(() => {
    setIsSelected(
      state.basketList.some(
        (el: ShoppingProduct) => el.item.age === product.age,
      ),
    );
  }, [state.basketList, state.selectedProduct]);

  const actionButtonHandler = () => {
    return isSelected ? removeProductCard() : addProductToBasket(product);
  };

  return (
    <button
      type="button"
      className={classNames('card-button', {
        selected: isSelected,
      })}
      onClick={actionButtonHandler}
    >
      {isSelected ? 'Added to cart' : 'Add to cart'}
    </button>
  );
};
