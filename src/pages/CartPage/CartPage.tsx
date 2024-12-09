import { useState } from 'react';
import { CartCard } from '../../components/CartCard';
import { CartTotal } from '../../components/CartTotal';
import { useAppSelector } from '../../utils/hooks';
import { ModalDialog } from '../../components/ModalDialog';
import { useLocation, useNavigate } from 'react-router-dom';

export const CartPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const goBack = () => {
    if (state?.search) {
      navigate({ pathname: '..', search: state.search });
    } else if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const { cartItems, quantity } = useAppSelector(state => state.products);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cartItemsLength = cartItems
    ? cartItems.reduce((sum, item) => sum + (quantity[item.itemId] || 0), 0)
    : 0;

  return (
    <div className="grids mb-[56px] sm:mb-[64px] xl:mb-[80px]">
      <div className="col-[1/5] mx-[16px] sm:col-[1/13] sm:mx-0 xl:col-[1/25]">
        <div className="mb-[24px] mt-[24px] flex items-center gap-[4px] sm:mb-[16px] sm:mt-[40px]">
          <img
            src="./img/icons/Arrow_Left_Black.svg"
            alt="Arrow"
            className="icons"
          />
          <p
            className="
              cursor-pointer 
              font-mont-semi 
              text-[12px] 
              leading-[15.34px] 
              text-secondary 
              transition-all
              duration-300
              ease-in-out
              hover:text-primary
            "
            onClick={goBack}
          >
            Back
          </p>
        </div>

        <h1 className="page-title mb-[32px]">Cart</h1>

        {cartItemsLength === 0 && (
          <h1
            className="
              page-title
              flex
              justify-center
              text-red-color
            "
          >{`Your cart is empty`}</h1>
        )}

        {cartItemsLength > 0 && (
          <div className="flex flex-col gap-[32px] xl:flex-row xl:gap-[16px]">
            <CartCard />

            <CartTotal setIsModalOpen={setIsModalOpen} />
          </div>
        )}
      </div>

      {isModalOpen && <ModalDialog setIsModalOpen={setIsModalOpen} />}
    </div>
  );
};
