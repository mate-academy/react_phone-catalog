export const checkoutModalDictionary = {
  ua: {
    title: 'Оформлення замовлення',
    totalLabel: (count: number) =>
      `Усього за ${count} ${count === 1 ? 'товар' : 'товари'}`,
    message: 'Ви готові підтвердити замовлення?',
    confirm: 'Підтвердити замовлення',
    clear: 'Очистити кошик',
    cancel: 'Скасувати',
  },
  en: {
    title: 'Checkout',
    totalLabel: (count: number) =>
      `Total for ${count} ${count === 1 ? 'item' : 'items'}`,
    message: 'Are you ready to proceed with your order?',
    confirm: 'Confirm Order',
    clear: 'Clear Cart',
    cancel: 'Cancel',
  },
};
