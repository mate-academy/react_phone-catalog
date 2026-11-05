import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { CartTemplate } from '@/components/templates';

import { useCartStore } from '@/entities/cart';
import { useProductByIds } from '@/entities/product';

export const CartPage = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `${t('cart')} | NICE GADGETS`;
  }, [t]);

  const items = useCartStore((state) => state.items);

  const productsIds = items.map((item) => item.productId);

  const {
    data: products = [],
    isPending: isPending,
    isError,
  } = useProductByIds(productsIds);

  const cartProducts = items
    .map((item) => {
      const product = products.find((product) => product.id === item.productId);

      if (!product) {
        return null;
      }

      return {
        ...product,
        quantity: item.quantity,
      };
    })
    .filter((item) => item !== null);

  const data = {
    cartContent: {
      items,
      cartProducts,
      isError,
      isPending,
    },
  };

  return <CartTemplate data={data} />;
};
