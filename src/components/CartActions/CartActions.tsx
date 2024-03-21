import React, { memo, useCallback, useEffect, useRef, useState } from 'react';

import { Cart, CartItem } from '../../utils/Cart';

import { Loader } from '../Loader';
import { UnrealizedFeature } from '../UnrealizedFeature';

import './CartActions.scss';

type Props = {
  items: CartItem[];
};

export const CartActions: React.FC<Props> = memo(({ items }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const timerId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setTotalPrice(Cart.getTotalPrice());
    setTotalItems(Cart.getTotalQuantity());
  }, [items]);

  const handleCheckout = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowModal(true);
      timerId.current = setTimeout(() => {
        setShowModal(false);
      }, 5000);
    }, 1000);
  }, []);

  const closeModal = useCallback(() => {
    if (timerId.current) {
      clearTimeout(timerId.current);
    }

    setShowModal(false);
  }, []);

  return (
    <div className="CartActions">
      <div className="CartActions__infoBlock">
        <h1>${totalPrice}</h1>
        <p
          className="CartActions__totalItems"
          data-cy="productQuantity"
        >{`Total for ${totalItems} items`}</p>
      </div>

      <hr className="CartActions__divider" />

      <button
        type="button"
        className="CartActions__checkoutBtn"
        onClick={handleCheckout}
      >
        {isLoading ? <Loader size="small" /> : 'Checkout'}
      </button>

      {showModal && <UnrealizedFeature onClose={closeModal} />}
    </div>
  );
});
