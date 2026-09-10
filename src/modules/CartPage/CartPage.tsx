// import styles from './CartPage.module.scss';

import { PageHeader } from '@/shared/components/PageHeader';
import { PageLayout } from '@/shared/components/PageLayout';
import { Cart } from './components/Cart';
import { BackButton } from '@/shared/components/BackButton';
import { useProducts } from '@/shared/hooks/useProducts';
import { useCartState } from '@/shared/hooks/useCartState';
import { useMemo } from 'react';
import { SavedProduct } from '@/types/SavedProduct';
import { CartSkeleton } from './components/Cart/components/CartSkeleton';
import { PageError } from '@/shared/components/PageError';

export const CartPage = () => {
  const productsState = useProducts();
  const cartState = useCartState();

  const saved: SavedProduct[] = useMemo(
    () =>
      cartState.reduce((acc, savedProduct) => {
        const actualProduct = productsState.products.find(
          product => product.id === savedProduct.id,
        );

        if (!actualProduct) {
          return acc;
        }

        acc.push({
          ...savedProduct,
          product: actualProduct,
        });

        return acc;
      }, [] as SavedProduct[]),
    [cartState, productsState],
  );

  let content: React.ReactNode = null;

  if (productsState.isLoading) {
    content = <CartSkeleton />;
  } else if (productsState.hasError) {
    content = <PageError reloadFunction={productsState.retryFetch} />;
  } else {
    content = <Cart products={saved} />;
  }

  return (
    <PageLayout
      topNav={<BackButton />}
      header={<PageHeader title="Cart" productsCount={0} />}
    >
      {content}
    </PageLayout>
  );
};
