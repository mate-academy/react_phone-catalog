export const cartPageDictionary = {
  ua: {
    title: 'Кошик',
    emptyMessage: 'Ваш кошик порожній',
    totalLabel: (count: number) =>
      `Усього за ${count} ${count === 1 ? 'товар' : 'товари'}`,
    checkoutButton: 'Оформити замовлення',
    orderConfirmed: 'Замовлення підтверджено! Дякуємо за покупку!',
  },
  en: {
    title: 'Cart',
    emptyMessage: 'Your cart is empty',
    totalLabel: (count: number) =>
      `Total for ${count} ${count === 1 ? 'item' : 'items'}`,
    checkoutButton: 'Checkout',
    orderConfirmed: 'Order confirmed! Thank you for your purchase!',
  },
};
