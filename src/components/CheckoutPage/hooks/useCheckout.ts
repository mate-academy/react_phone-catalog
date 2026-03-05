import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import {
  createOrder,
  createStripeIntent,
  saveOrderDiscount,
} from '@/services/paymentAPI';
import { auth } from '@/firebase/firebase';
import { showError, showSuccess } from '@/lib/toast';
import type { CheckoutFormValues } from '@/components/Checkout';
import type { Order, PaymentMethod } from '@/types/Order';
import { t } from 'i18next';
import type { CartItem } from '@/types/Book';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { DISCOUNT_PERCENTAGE } from '@/components/RegisterPromo/types/promo-constants';

export const useCheckout = (
  cartItems: CartItem[],
  paymentMethod: PaymentMethod,
  onClearCart: () => void,
) => {
  const navigate = useNavigate();
  const { userData, consumeDiscount } = useAuth();

  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [stripeClientSecret, setStripeClientSecret] = useState<string | null>(
    null,
  );
  const [step, setStep] = useState<'delivery' | 'payment'>('delivery');

  const discount = userData?.discount ? DISCOUNT_PERCENTAGE : undefined;

  const mutation = useMutation<Order, Error, CheckoutFormValues>({
    mutationFn: async (customer) => {
      if (!auth.currentUser) throw new Error(t('toast.loginRequired'));

      const order = await createOrder({
        customer,
        items: cartItems,
        paymentMethod,
        discount,
        userId: auth.currentUser.uid,
      });

      if (discount) {
        await saveOrderDiscount(order.id, discount);
      }

      if (paymentMethod === 'stripe') {
        const { clientSecret } = await createStripeIntent(
          order.id,
          order.total,
        );
        setStripeClientSecret(clientSecret);
      }

      if (discount) {
        const discountAmount =
          Math.round(order.subtotal * (discount / 100) * 100) / 100;
        return { ...order, discount, total: order.subtotal - discountAmount };
      }
      return order;
    },
    onSuccess: (order) => {
      setCurrentOrder(order);
      setStep('payment');
    },
    onError: () => showError(t('toast.orderError')),
  });

  const handleDeliverySubmit = (data: CheckoutFormValues) => {
    mutation.mutate(data);
  };

  const handlePaymentSuccess = async () => {
    if (discount) {
      await consumeDiscount();
    }
    navigate(`/order-success/${currentOrder?.id}`);
    onClearCart();
    showSuccess(t('toast.orderSuccess'));
  };

  const handlePaymentError = (message: string) => {
    showError(message || t('toast.orderError'));
  };

  return {
    step,
    setStep,
    currentOrder,
    stripeClientSecret,
    isLoading: mutation.isPending,
    handleDeliverySubmit,
    handlePaymentSuccess,
    handlePaymentError,
  };
};
