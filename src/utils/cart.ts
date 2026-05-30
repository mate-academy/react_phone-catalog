export type CartItem = {
  productId: string;
  quantity: number;
};

export const addToCart = (productId: string) => {
  const cartRaw = localStorage.getItem('cart');
  const cart: CartItem[] = cartRaw ? JSON.parse(cartRaw) : [];

  const existingItem = cart.some(item => item.productId === productId);

  if (existingItem === false) {
    cart.push({ productId, quantity: 1 });
    localStorage.setItem('cart', JSON.stringify(cart));
  }
};

export const getProductsFromCart = () => {
  const cartRaw = localStorage.getItem('cart');
  const cart: CartItem[] = cartRaw ? JSON.parse(cartRaw) : [];

  return cart;
};

export const deleteFromCart = (productId: string) => {
  const cartRaw = localStorage.getItem('cart');
  let cart: CartItem[] = cartRaw ? JSON.parse(cartRaw) : [];

  const existingItem = cart.some(item => item.productId === productId);

  if (existingItem === true) {
    cart = cart.filter(item => {
      return item.productId !== productId;
    });
    localStorage.setItem('cart', JSON.stringify(cart));
  }
};

export const changeCounter = (action: string, productId: string) => {
  const cartRaw = localStorage.getItem('cart');
  const cart: CartItem[] = cartRaw ? JSON.parse(cartRaw) : [];

  const existingItem = cart.find(item => item.productId === productId);

  if (existingItem) {
    if (action === 'plus') {
      existingItem.quantity += 1;
    } else {
      existingItem.quantity -= 1;
    }
  }

  localStorage.setItem('cart', JSON.stringify(cart));
};

export const getCounter = (productId: string) => {
  const cartRaw = localStorage.getItem('cart');
  const cart: CartItem[] = cartRaw ? JSON.parse(cartRaw) : [];

  const existingItem = cart.find(item => item.productId === productId);

  return existingItem?.quantity;
};

export const clearCart = () => {
  localStorage.removeItem('cart');
};
