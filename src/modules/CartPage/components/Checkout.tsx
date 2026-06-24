import { useDispatch, useSelector } from 'react-redux';
import cn from 'clsx';
import { cartActions } from '../../../store/actions';
import { cartSelectors } from '../selectors/cartSelectors';
import { Button } from '../../shared/components/ui/Button/Button';
import type { FC } from 'react';
import { useTranslations } from 'use-intl';

type CheckoutProps = {
  className: string;
};

export const Checkout: FC<CheckoutProps> = ({ className }) => {
  const dispatch = useDispatch();
  const t = useTranslations('misc');

  const totalAmount = useSelector(cartSelectors.selectTotalAmount);
  const totalQuantity = useSelector(cartSelectors.selectTotalQuantity);

  const handleCheckout = () => {
    const isConfirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (isConfirmed) {
      dispatch(cartActions.clearCart());
    }
  };

  return (
    <div
      className={cn(
        'shadow-elements dark:shadow-d-surface2 flex flex-col gap-6 p-6 shadow-inner',
        className,
      )}
    >
      <div className="">
        <h2 className="text-h2 text-primary dark:text-d-white text-center">
          ${totalAmount}
        </h2>
        <p className="text-body text-secondary dark:text-d-secondary text-center">
          {t('totalFor', { count: totalQuantity })}
        </p>
      </div>
      <div className="border-elements dark:border-d-elements my-[-0.5px] border-[0.5px]"></div>
      <Button
        onClick={handleCheckout}
        className="bg-primary dark:bg-d-accent dark:hover:bg-d-hover-bs hover:shadow-hover-bs text-buttons dark:text-d-white flex h-12 w-full flex-[1_1_auto] items-center justify-center text-white transition hover:shadow-[0_3px_13px_0]"
      >
        {t('checkout')}
      </Button>
    </div>
  );
};
