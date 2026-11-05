import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { OrderHistoryTemplate } from '@/components/templates/OrderHistoryTemplate';
import { useProducts } from '@/entities/product/model/product.queries';
import type { Order } from '@/shared/types/Order';

export const OrderHistoryPage = () => {
  const { t } = useTranslation();

  const [orders] = useState<Order[]>(() => {
    try {
      const savedOrders = localStorage.getItem('orderHistory');

      return savedOrders ? (JSON.parse(savedOrders) as Order[]) : [];
    } catch {
      return [];
    }
  });

  const { data: products = [] } = useProducts();

  useEffect(() => {
    document.title = `${t('orderHistoryTitle')} | NICE GADGETS`;
  }, [t]);

  return (
    <OrderHistoryTemplate
      orders={orders}
      products={products}
    />
  );
};
