/* eslint-disable max-len */
/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { counter, storeGadgets, useModalStore } from '../../store/store';
import { CartItem } from '../CartItem';
import { storage } from '../../support/utility';

export const Cart:React.FC = () => {
  const { list } = storeGadgets();
  const { cart } = counter();
  const [price, setPrice] = useState(0);
  const [itemsNumber, setItemsNumber] = useState(0);
  const { isOpen, setIsOpen } = useModalStore();
  const cartGadgetsID = storage.getAll('cart');
  const gadgets = list.filter(item => (cartGadgetsID.includes(item.id) ? item : false));

  useEffect(() => {}, [cart]);

  return (

    <section className="flex gap-4 max-w-[1136px] mx-auto mt-10">
      {gadgets.length ? (
        <>
          <div className="flex flex-col gap-4 flex-grow-[2]">
            {gadgets.map(gadget => <CartItem item={gadget} setPrice={setPrice} setNumbers={setItemsNumber} key={gadget.id} />)}
          </div>
          <div className="flex-col flex-grow-[1] items-center justify-center border border-elements p-6 h-min">
            <p className="text-center h1 font-bold">{`$${price}`}</p>
            <p
              className="text-center text-[14px] font-semibold text-secondary"
            >
              {`Total for ${itemsNumber} item${itemsNumber === 1 ? '' : 's'}`}
            </p>
            <div className="h-[1px] w-full bg-elements my-6" />
            <button
              type="button"
              className="text-white h4 bg-primary w-full py-[14px] shadow uppercase"
              onClick={() => setIsOpen(!isOpen)}
            >
              checkout
            </button>
          </div>
        </>
      ) : <p className="h1 text-secondary flex justify-center mx-auto">Cart is empty</p>}

    </section>

  );
};
