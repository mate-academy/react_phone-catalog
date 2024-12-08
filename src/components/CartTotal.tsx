import React from "react";
import { useAppSelector } from "../utils/hooks";

type Props = {
  setIsModalOpen: (isOpen: boolean) => void;
}

export const CartTotal: React.FC<Props> = ({ setIsModalOpen }) => {
  const { cartItems, totalPrice } = useAppSelector(state => state.products);

  return (
    <div className="flex h-full w-full flex-col gap-[16px] rounded-[16px] border border-elements xl:w-[50%]">
      <div className="total-container">
        <h2 className="page-title">{`$${totalPrice}`}</h2>
        <p
          className="
            mb-[16px]
            text-[14px]
            leading-[21px]
            text-secondary
          "
        >{`Total for ${cartItems.length} items`}</p>
      </div>

      <div className="p-[24px] pt-0">
        <button
          className="
            card-button 
            w-full 
            bg-accent 
            text-white
          "
          onClick={() => setIsModalOpen(true)}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};