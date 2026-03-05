import { useState } from 'react';
import { useUserOrders } from '@/hooks/useUserOrders';
import { showError } from '@/lib/toast';
import { t } from 'i18next';
import { ORDERS_PREVIEW_COUNT } from '../constants/orderStatusConfig';

export const useUserOrdersPreview = () => {
  const [isShowingAll, setIsShowingAll] = useState(false);
  const { data: orders = [], isLoading, isError } = useUserOrders();

  if (isError) {
    showError(t('toast.orderError'));
  }

  const visibleOrders =
    isShowingAll ? orders : orders.slice(0, ORDERS_PREVIEW_COUNT);
  const hasMoreOrders = orders.length > ORDERS_PREVIEW_COUNT;

  const handleToggleShowAll = () => {
    setIsShowingAll((previous) => !previous);
  };

  return {
    orders,
    visibleOrders,
    isLoading,
    isShowingAll,
    hasMoreOrders,
    handleToggleShowAll,
  };
};
