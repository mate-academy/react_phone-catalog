import { useSelector } from 'react-redux';
import { cartSelectors } from './selectors/cartSelectors';
import { CartList } from './components/CartList';
import { Checkout } from './components/Checkout';
import type { FC } from 'react';
import { BackButton } from '../shared/components/ui/Button/BackButton';
import { useTranslations } from 'use-intl';

export const CartPage: FC = () => {
  const cartProducts = useSelector(cartSelectors.selectAll);
  const t = useTranslations('cart');

  if (!cartProducts || cartProducts.length < 1) {
    return (
      <div className="mt-6 flex flex-col items-center justify-center gap-6 sm:mt-8 xl:mt-14">
        <img
          src="images/cart-is-empty.webp"
          alt={t('empty')}
          className="w-full max-w-1/2 sm:max-w-1/3"
        />
        <h2 className="text-h2 text-primary dark:text-d-white text-center">
          {t('empty')}
        </h2>
      </div>
    );
  }

  return (
    <div>
      <BackButton className="mt-10" />
      <h1 className="text-h1 text-primary dark:text-d-white mt-6 sm:mt-4">
        {t('title')}
      </h1>
      <div className="xl:pageGrid mt-8 flex flex-col gap-8">
        <CartList products={cartProducts} className="xl:col-span-16" />
        <Checkout className="h-fit xl:col-span-8" />
      </div>
    </div>
  );
};
