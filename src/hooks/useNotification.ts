import { useQuery, useQueryClient } from '@tanstack/react-query';
import favouriveAddIcon from '../images/icons/favourite-add-icon.svg';
import favouriteRemoveIcon from '../images/icons/favourite-remove-icon.svg';
import basketAddIcon from '../images/icons/basket-add-icon.svg';
import basketRemoveIcon from '../images/icons/basket-checkout-icon.svg';
import basketShopping from '../images/icons/basket-buy-all.svg';

interface Notification {
  id: number;
  title?: string;
  description?: string;
  icon?: string;
}

type TypeNotification =
  | 'addToFavourite'
  | 'removeFromFavourite'
  | 'addToBasket'
  | 'removeFromBasket'
  | 'clearAllBasket';

const notificationDelay = 3000;
const queryKey = 'notifications';

const getDataNotification = (
  type: TypeNotification,
  notification?: Partial<Omit<Notification, 'id'>>,
) => {
  switch (type) {
    case 'addToFavourite':
      return {
        icon: favouriveAddIcon,
        title: 'You have successfully added to favourive!',
        description: 'Your good in the favourive section!',
      };

    case 'removeFromFavourite':
      return {
        icon: favouriteRemoveIcon,
        title: 'You have successfully removed from favourive!',
        description: 'You can add this good nex time',
      };

    case 'addToBasket':
      return {
        icon: basketAddIcon,
        title: 'You have successfully added to basket!',
        description: 'Your good in the basket section!',
      };

    case 'removeFromBasket':
      return {
        icon: basketRemoveIcon,
        title: 'You have successfully removed from basket!',
        description: 'You can add this good nex time',
      };

    case 'clearAllBasket':
      return {
        icon: basketShopping,
        title: 'Successfully',
        description: 'Thank you for your purchase',
      };

    default:
      return {
        title: 'Oops something went wrong',
        description:
          notification?.description || 'Reload the page or try again later',
      };
  }
};

export const useNotification = () => {
  const queryClient = useQueryClient();

  const { data: notifications } = useQuery<Notification[]>({
    queryKey: [queryKey],
    initialData: [],
  });

  const removeNotification = (notificationId: number) => {
    queryClient.setQueryData<Notification[]>([queryKey], prev =>
      prev?.filter(item => item.id !== notificationId),
    );
  };

  const addNotification = (
    type: TypeNotification,
    notification?: Partial<Omit<Notification, 'id'>>,
    config?: {
      delay?: number | null;
    },
  ) => {
    const newNotification = {
      id: +Date.now(),
      ...getDataNotification(type, notification),
    };

    queryClient.setQueryData<Notification[]>([queryKey], prev => [
      ...(prev || []).filter(item => item.title !== newNotification?.title),
      newNotification,
    ]);

    if (config?.delay !== null) {
      const timeoutNotificationId = setTimeout(() => {
        removeNotification(newNotification.id);
        clearTimeout(timeoutNotificationId);
      }, config?.delay || notificationDelay);
    }

    return newNotification;
  };

  return {
    notifications,
    addNotification,
    removeNotification,
  };
};
