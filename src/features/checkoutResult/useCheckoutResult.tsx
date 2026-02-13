import { post } from '@shared/api';
import { CheckoutBody } from '@shared/api/types/bodies.types';
import { useNavigate } from 'react-router-dom';
import { useGlobalActions, useGlobalData } from '..';

export const useCheckoutRes = () => {
  const navigate = useNavigate();
  const { modalIsOpened } = useGlobalData();
  const { toggleModal } = useGlobalActions();
  const { clearCart } = useGlobalActions();

  const processCheckout = async (body: CheckoutBody) => {
    try {
      const res = await post.checkout(body);

      if (!res.ok) {
        navigate('/404', {
          state: { message: res.error.message, from: '/cart' },
          replace: true,
        });

        return;
      }

      clearCart();
      if (modalIsOpened == true) {
        toggleModal();
      }

      const orderId = res.data;

      navigate('/checkout-complete', {
        state: { message: orderId, from: '/cart' },
        replace: true,
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log({ error: e });
    }
  };

  return { processCheckout };
};
