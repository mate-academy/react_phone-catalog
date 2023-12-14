import React, { useContext } from 'react';
import { ICONS } from '../../icons';
import { BASE_URL } from '../../utils/constants';
import { Product } from '../../types/Product';
import { GlobalContext } from '../../Context/GlobalContext';

import './CartItem.scss';

type Props = {
  item: Product;
};

export const CartItem: React.FC<Props> = ({ item }) => {
  const {
    products,
    setProducts,
    localStore,
    setLocalStore,
  } = useContext(GlobalContext);

  const handleCartItemChange = (action: string) => {
    const currentProducts = [...products];
    const currentStoreState = [...localStore];
    const newItem = { ...item };

    if (action === 'add') {
      newItem.count += 1;
      newItem.totalAmount += newItem.price;
    }

    if (action === 'reduce') {
      if (newItem.count === 1) {
        return;
      }

      newItem.count -= 1;
      newItem.totalAmount -= newItem.price;
    }

    if (action === 'remove') {
      newItem.count = 1;
      newItem.inCart = false;
      newItem.totalAmount = newItem.price;
    }

    const index = currentProducts
      .findIndex(product => product.id === newItem.id);

    const indexStore = currentStoreState
      .findIndex(storeItem => storeItem.id === newItem.id);

    if (indexStore !== -1) {
      currentStoreState.splice(indexStore, 1, newItem);
    }

    currentProducts.splice(index, 1, newItem);

    setProducts(currentProducts);
    setLocalStore(currentStoreState);
  };

  return (
    <div className="cart-item" key={item.id}>
      <button
        type="button"
        className="cart-item_delete"
        onClick={() => handleCartItemChange('remove')}
      >
        <img src={ICONS.iconClose} alt="delete product" />
      </button>
      <div className="cart-item_img-box">
        <img
          src={`${BASE_URL}${item.image}`}
          alt="Product banner"
          className="cart-item_img"
        />
      </div>
      <p className="cart-item_name body-text-style">{item.name}</p>
      <div className="cart-item_btns">
        <button
          type="button"
          className="products-slider_btn page-btns"
          onClick={() => handleCartItemChange('reduce')}
        >
          {item.count > 1 ? (
            <img src={ICONS.iconMinusDisable} alt="Minus disable" />
          ) : (
            <img src={ICONS.iconMinus} alt="Minus active" />
          )}
        </button>
        <p className="cart-item_count body-text-style">{item.count}</p>
        <button
          type="button"
          className="products-slider_btn page-btns"
          onClick={() => handleCartItemChange('add')}
        >
          <img src={ICONS.iconPlus} alt="Plus" />
        </button>
      </div>
      <p className="cart-item_amount h2-text-style">
        {`$${item.totalAmount}`}
      </p>
    </div>
  );
};
