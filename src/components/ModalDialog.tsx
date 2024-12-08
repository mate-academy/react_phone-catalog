import React from "react";
import { useAppDispatch } from "../utils/hooks";
import * as productActions from '../features/products';

type Props = {
  setIsModalOpen: (isOpen: boolean) => void;
}

export const ModalDialog: React.FC<Props> = ({ setIsModalOpen }) => {
  const dispatch = useAppDispatch();

  const handleClearCart = () => {
    dispatch(productActions.setCartItems(null));
    localStorage.setItem('cartItems', JSON.stringify([]));

    setIsModalOpen(false);
  };

  return (
    <div
      className="
        fixed left-0 top-0 z-10 flex h-full w-full justify-center bg-[rgba(0,0,0,0.4)]
      "
    >
      <div
        className="
          absolute
          top-[30%]
          mx-[16px]
          flex
          flex-col
          rounded-[20px]
          border
          border-elements
          bg-white
          sm:mx-[24px]
          xl:mx-[32px]
        "
      >
        <h4
          className="
            p-[24px]
            font-mont-semi
            text-[20px]
            leading-[26px]
            text-primary
            sm:p-[40px]
          "
        >Checkout is not implemented yet. Do you want to clear the Cart?</h4>

        <div className="flex gap-[16px] p-[24px] sm:p-[40px]">
          <button
            className="
              card-button
              w-full
              bg-accent
              text-white
            "
            onClick={handleClearCart}
          >
            Confirm
          </button>

          <button
            className="
              card-button
              w-full
              bg-accent
              text-white
            "
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};