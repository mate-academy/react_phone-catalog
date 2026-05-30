import React, { createContext, useState, useContext, useEffect } from 'react';
import {
  Product,
  getProductIdentifier,
  areProductIdsEquivalent,
} from '../types/Product';

interface CartItem {
  productId: string; // This will store the uniqueId of the product
  quantity: number;
}

interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (productOrId: Product | string) => void;
  removeFromCart: (productOrId: Product | string) => void;
  updateQuantity: (productOrId: Product | string, quantity: number) => void;
  isInCart: (productOrId: Product | string) => boolean;
  getCartItemQuantity: (productOrId: Product | string) => number;
  getTotalItems: () => number;
  getTotalPrice: (products: Product[]) => number;
  getCartSummary: (products: Product[]) => {
    totalItems: number;
    totalPrice: number;
  };
  clearCart: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

// Set this to true if you want to start with an empty cart each time the app loads
const RESET_CART_ON_RELOAD = true;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Initialize cart items from localStorage if available
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // Check if we should reset the cart
    if (RESET_CART_ON_RELOAD) {
      localStorage.removeItem('cart');

      return [];
    }

    try {
      const storedCart = localStorage.getItem('cart');

      return storedCart ? JSON.parse(storedCart) : [];
    } catch {
      return [];
    }
  });

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Function to clear the cart
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  // Add a product to the cart using either the product object or its ID
  const addToCart = (productOrId: Product | string) => {
    // Get a consistent product identifier
    const productId =
      typeof productOrId === 'string'
        ? productOrId
        : getProductIdentifier(productOrId);

    // Debug logging for troubleshooting
    // eslint-disable-next-line no-console
    console.log('Adding to cart:', {
      productId,
      isString: typeof productOrId === 'string',
      hasData: typeof productOrId !== 'string',
    });

    setCartItems(prev => {
      // Check if this product is already in the cart
      const existingItem = prev.find(item => item.productId === productId);

      if (existingItem) {
        // If it exists, increment the quantity
        return prev.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        // If it doesn't exist, add it with quantity 1
        return [...prev, { productId, quantity: 1 }];
      }
    });
  };

  // Remove a product from the cart using either the product object or its ID
  const removeFromCart = (productOrId: Product | string) => {
    // Get a consistent product identifier
    const productId =
      typeof productOrId === 'string'
        ? productOrId
        : getProductIdentifier(productOrId);

    setCartItems(prev =>
      prev.filter(item => !areProductIdsEquivalent(item.productId, productId)),
    );
  };

  // Update the quantity of a product in the cart
  const updateQuantity = (productOrId: Product | string, quantity: number) => {
    // Get a consistent product identifier
    const productId =
      typeof productOrId === 'string'
        ? productOrId
        : getProductIdentifier(productOrId);

    if (quantity <= 0) {
      removeFromCart(productId);

      return;
    }

    setCartItems(prev =>
      prev.map(item =>
        areProductIdsEquivalent(item.productId, productId)
          ? { ...item, quantity }
          : item,
      ),
    );
  };

  // Check if a product is in the cart
  const isInCart = (productOrId: Product | string) => {
    // Get a consistent product identifier
    const productId =
      typeof productOrId === 'string'
        ? productOrId
        : getProductIdentifier(productOrId);

    return cartItems.some(item =>
      areProductIdsEquivalent(item.productId, productId),
    );
  };

  // Get the quantity of a product in the cart
  const getCartItemQuantity = (productOrId: Product | string) => {
    // Get a consistent product identifier
    const productId =
      typeof productOrId === 'string'
        ? productOrId
        : getProductIdentifier(productOrId);

    const cartItem = cartItems.find(item =>
      areProductIdsEquivalent(item.productId, productId),
    );

    return cartItem ? cartItem.quantity : 0;
  };

  const getTotalItems = () => {
    // Make sure we only count items that actually exist in the cart
    if (!cartItems || cartItems.length === 0) {
      return 0;
    }

    return cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
  };

  const getTotalPrice = (products: Product[]) => {
    // Make sure we have valid cart items and products
    if (
      !cartItems ||
      cartItems.length === 0 ||
      !products ||
      products.length === 0
    ) {
      // eslint-disable-next-line no-console
      console.log('getTotalPrice: No valid cart items or products');

      return 0;
    }

    // eslint-disable-next-line no-console
    console.log('getTotalPrice inputs:', {
      cartItems,
      productCount: products.length,
      products: products.slice(0, 5).map(p => ({
        id: p.id,
        uniqueId: p.uniqueId,
        name: p.name,
        price: p.price,
      })),
    });

    let total = 0;
    let productsFound = 0;
    let productsNotFound = 0;

    cartItems.forEach(cartItem => {
      // Find the product using the stored productId
      const product = products.find(prod => {
        const prodId = getProductIdentifier(prod);

        return areProductIdsEquivalent(prodId, cartItem.productId);
      });

      if (product) {
        productsFound++;
        const itemTotal = product.price * cartItem.quantity;

        total += itemTotal;

        // eslint-disable-next-line no-console
        console.log(`Found product for cart item ${cartItem.productId}:`, {
          name: product.name,
          price: product.price,
          quantity: cartItem.quantity,
          itemTotal,
        });
      } else {
        productsNotFound++;
        // eslint-disable-next-line no-console
        console.log(`No product found for cart item ${cartItem.productId}`);
      }
    });

    // eslint-disable-next-line no-console
    console.log('getTotalPrice result:', {
      total,
      productsFound,
      productsNotFound,
    });

    return total;
  };

  // Add a specific function to get cart information for display in summary
  const getCartSummary = (products: Product[]) => {
    let totalItems = 0;
    let totalPrice = 0;

    if (cartItems.length === 0 || products.length === 0) {
      return { totalItems, totalPrice };
    }

    // Calculate total items directly from cart
    totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    // Calculate total price
    cartItems.forEach(cartItem => {
      const product = products.find(p =>
        areProductIdsEquivalent(getProductIdentifier(p), cartItem.productId),
      );

      if (product) {
        totalPrice += product.price * cartItem.quantity;
      }
    });

    return { totalItems, totalPrice };
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        isInCart,
        getCartItemQuantity,
        getTotalItems,
        getTotalPrice,
        getCartSummary,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};
