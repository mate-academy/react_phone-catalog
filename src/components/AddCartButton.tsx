import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { addCart, deleteCart } from '../Reducer/cartReducer';

import { Products } from '../type/Products';

type Props = {
  phone: Products;
};

export const AddCartButton: React.FC<Props> = ({ phone }) => {
  const [isAdded, setIsAdded] = useState(false);

  const cart = useSelector((state: any) => state.cart);

  const { t } = useTranslation();

  useEffect(() => {
    setIsAdded(
      cart.find((product: Products) => product.itemId === phone.itemId),
    );
  }, [cart]);

  const dispatch = useDispatch();

  const handler = (product: Products) => {
    if (isAdded) {
      dispatch(deleteCart(product.itemId));
    } else {
      dispatch(addCart(product));
    }
  };

  return (
    <button
      className={classNames(
        'button',
        'button__add',
        { 'button__add--selected': isAdded },
      )}
      type="button"
      onClick={() => handler(phone)}
    >
      {isAdded ? t('addedToCart') : t('addToCart')}
    </button>
  );
};
