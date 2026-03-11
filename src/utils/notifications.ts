import { toast } from 'sonner';
import i18n from './i18n';

export const notify = {
  addedToCart: (productName: string) =>
    toast.success(i18n.t('notifications.added_to_cart'), {
      description: i18n.t('notifications.added_to_cart_desc', {
        name: productName,
      }),
    }),

  alreadyInCart: (productName: string) =>
    toast.info(i18n.t('notifications.already_in_cart'), {
      description: i18n.t('notifications.already_in_cart_desc', {
        name: productName,
      }),
    }),

  removedFromCart: (productName: string) =>
    toast.info(i18n.t('notifications.removed_from_cart'), {
      description: i18n.t('notifications.removed_from_cart_desc', {
        name: productName,
      }),
    }),

  addedToFavorites: (productName: string) =>
    toast.success(i18n.t('notifications.added_to_fav'), {
      description: i18n.t('notifications.added_to_fav_desc', {
        name: productName,
      }),
    }),

  removedFromFavorites: (productName: string) =>
    toast.info(i18n.t('notifications.removed_from_fav'), {
      description: i18n.t('notifications.removed_from_fav_desc', {
        name: productName,
      }),
    }),

  error: (message: string = i18n.t('notifications.something_wrong')) =>
    toast.error(i18n.t('notifications.error'), { description: message }),

  success: (message: string, description?: string) =>
    toast.success(message, { description }),
};
