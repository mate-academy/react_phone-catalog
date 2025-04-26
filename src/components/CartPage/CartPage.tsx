import React, { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../context/ProductContext';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Link, useNavigate } from 'react-router-dom';
import {
  getProductIdentifier,
  Product,
  areProductIdsEquivalent,
} from '../../types/Product';
import './CartPage.scss';

// Імпортуємо дані продуктів безпосередньо з файлів
import { phones } from '../PhonesPage/PhonesPage';
import { tablets } from '../TabletsPage/TabletsPage';
import { accessories } from '../AccessoriesPage/AccessoriesPage';

export const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartSummary } =
    useCart();
  const { products: contextProducts } = useProducts();
  const navigate = useNavigate();

  // State to hold all products from all categories
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  // Get products from all categories on component mount
  useEffect(() => {
    // Log the imported products to make sure they are available
    // eslint-disable-next-line no-console
    console.log('Imported product data:', {
      phonesCount: phones.length,
      tabletsCount: tablets.length,
      accessoriesCount: accessories.length,
      phones: phones.slice(0, 2).map(p => ({
        id: p.id,
        uniqueId: p.uniqueId,
        category: p.category,
        name: p.name,
      })),
    });

    // Combine all products with context products
    const combinedProducts = [
      ...contextProducts,
      ...phones,
      ...tablets,
      ...accessories,
    ];

    // Filter out duplicates based on uniqueId
    const uniqueProducts = combinedProducts.filter((product, index, self) => {
      // Get the uniqueId for the current product
      const productId = getProductIdentifier(product);

      // Check if this is the first occurrence of this uniqueId
      return (
        index === self.findIndex(p => getProductIdentifier(p) === productId)
      );
    });

    setAllProducts(uniqueProducts);

    // Log all products for debugging
    // eslint-disable-next-line no-console
    console.log(
      'All products in CartPage:',
      uniqueProducts.map(p => ({
        id: p.id,
        uniqueId: p.uniqueId,
        productId: getProductIdentifier(p),
      })),
    );
  }, [contextProducts]);

  // Log cart items for debugging
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('Cart items:', cartItems);
  }, [cartItems]);

  // Get products that are in the cart using our consistent identifier function
  const cartProducts = allProducts.filter(product => {
    const productId = getProductIdentifier(product);
    const isInCart = cartItems.some(item =>
      areProductIdsEquivalent(item.productId, productId),
    );

    // Debug logging for each product check
    // eslint-disable-next-line no-console
    console.log('Checking product:', {
      productId,
      name: product.name,
      uniqueId: product.uniqueId,
      isInCart,
      matchingCartItem: cartItems.find(item =>
        areProductIdsEquivalent(item.productId, productId),
      ),
    });

    return isInCart;
  });

  // If we haven't found products through normal matching, attempt to match by ID or by direct comparison
  if (cartProducts.length === 0 && cartItems.length > 0) {
    // eslint-disable-next-line no-console
    console.log('No products found in cart, attempting fallback matching');

    // Try to manually find products that match the cart items
    cartItems.forEach(cartItem => {
      // Try to find by exact uniqueId match
      const matchingProduct = allProducts.find(p => {
        if (p.uniqueId === cartItem.productId) {
          // eslint-disable-next-line no-console
          console.log('Found by uniqueId:', p.name);

          return true;
        }

        // Try comparing the generated ID
        const generatedId = `phones-${p.id}`;

        if (generatedId === cartItem.productId) {
          // eslint-disable-next-line no-console
          console.log('Found by generated ID:', p.name);

          return true;
        }

        return false;
      });

      if (matchingProduct && !cartProducts.includes(matchingProduct)) {
        cartProducts.push(matchingProduct);
      }
    });
  }

  // Sort cart products to match the order in cartItems for consistent display
  cartProducts.sort((a, b) => {
    const aId = getProductIdentifier(a);
    const bId = getProductIdentifier(b);
    const aIndex = cartItems.findIndex(item =>
      areProductIdsEquivalent(item.productId, aId),
    );
    const bIndex = cartItems.findIndex(item =>
      areProductIdsEquivalent(item.productId, bId),
    );

    return aIndex - bIndex;
  });

  const getQuantity = (productId: string) => {
    const cartItem = cartItems.find(item =>
      areProductIdsEquivalent(item.productId, productId),
    );

    return cartItem ? cartItem.quantity : 0;
  };

  // Get the cart summary using our improved function
  const { totalItems: summaryTotalItems, totalPrice: summaryTotalPrice } =
    getCartSummary(allProducts);

  // Local calculation of the total to double-check context's price calculation
  const calculateLocalTotal = () => {
    if (cartProducts.length === 0) {
      return 0;
    }

    return cartProducts.reduce((sum, product) => {
      const productId = getProductIdentifier(product);
      const quantity = getQuantity(productId);
      const itemTotal = product.price * quantity;

      // eslint-disable-next-line no-console
      console.log(`Local price calc for ${product.name}:`, {
        price: product.price,
        quantity,
        itemTotal,
      });

      return sum + itemTotal;
    }, 0);
  };

  const localTotalPrice = calculateLocalTotal();

  // Add debug logging for price calculation
  // eslint-disable-next-line no-console
  console.log('Price calculation:', {
    totalPrice: summaryTotalPrice,
    totalItems: summaryTotalItems,
    cartItemsCount: cartItems.length,
    allProductsCount: allProducts.length,
    cartProductsCount: cartProducts.length,
    cartProducts: cartProducts.map(p => ({
      name: p.name,
      price: p.price,
      id: p.id,
      uniqueId: p.uniqueId,
      quantity: getQuantity(getProductIdentifier(p)),
      total: p.price * getQuantity(getProductIdentifier(p)),
    })),
  });

  // Add debug logging for price calculation comparison
  // eslint-disable-next-line no-console
  console.log('Price calculation comparison:', {
    contextTotalPrice: summaryTotalPrice,
    localTotalPrice,
    difference: Math.abs(summaryTotalPrice - localTotalPrice),
  });

  // Show empty cart only if cartItems is empty
  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <Header />
        <div className="cart-container">
          <div className="cart-back">
            <button className="cart-back__button" onClick={() => navigate(-1)}>
              <span className="cart-back__icon">←</span>
              Back
            </button>
          </div>
          <h2 className="cart-title">Cart</h2>
          <div className="cart-empty">
            <p className="cart-empty__message">Your cart is empty</p>
            <Link to="/phones" className="cart-empty__link">
              Go shopping
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="cart-page">
      <Header />
      <div className="cart-container">
        <div className="cart-back">
          <button className="cart-back__button" onClick={() => navigate(-1)}>
            <span className="cart-back__icon">←</span>
            Back
          </button>
        </div>
        <h2 className="cart-title">Cart</h2>

        {/* Debug info - COMMENTED OUT */}
        {/*
        <div className="cart-debug-info" style={{ padding: "10px", backgroundColor: "#f0f0f0", fontSize: "12px", borderRadius: "5px", marginBottom: "20px" }}>
          <p><strong>Debug Info:</strong></p>
          <p>Items in cart: {cartItems.length}</p>
          <p>Products found: {allProducts.length}</p>
          <p>Cart Products found: {cartProducts.length}</p>
          <p>Total items: {summaryTotalItems}</p>
          <p>Total price (context): ${summaryTotalPrice}</p>
          <p>Total price (local): ${localTotalPrice}</p>
          <p>Cart item IDs: {cartItems.map(item => item.productId).join(', ')}</p>
          <p>First product: {cartProducts.length > 0 ? cartProducts[0].name : 'None'}</p>
          <p>First product price: {cartProducts.length > 0 ? cartProducts[0].price : 0}</p>
          <p>First product quantity: {cartProducts.length > 0 ? getQuantity(getProductIdentifier(cartProducts[0])) : 0}</p>
        </div>
        */}

        <div className="cart-content">
          <div className="cart-items">
            {cartProducts.length > 0 ? (
              <>
                {/* Кнопка для очищення кошика (наразі не потрібна)
                <div className="cart-actions">
                  <button
                    className="cart-actions__clear-btn"
                    onClick={clearCart}
                  >
                    Clear cart
                  </button>
                </div>
                */}
                {cartProducts.map(product => {
                  const productId = getProductIdentifier(product);
                  const quantity = getQuantity(productId);

                  return (
                    <div className="cart-item" key={productId}>
                      <button
                        className="cart-item__remove"
                        onClick={() => {
                          removeFromCart(product);
                          // Add a small timeout to ensure state updates properly
                          setTimeout(() => {
                            // Force component to re-render
                            setAllProducts([...allProducts]);
                          }, 100);
                        }}
                      >
                        ×
                      </button>

                      <div className="cart-item__image-container">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="cart-item__image"
                        />
                      </div>

                      <div className="cart-item__details">
                        <h3 className="cart-item__name">{product.name}</h3>
                      </div>

                      <div className="cart-item__quantity">
                        <button
                          className="cart-item__quantity-btn"
                          onClick={() => {
                            updateQuantity(product, quantity - 1);
                            // Add a small timeout to ensure state updates properly
                            setTimeout(() => {
                              // Force component to re-render
                              setAllProducts([...allProducts]);
                            }, 100);
                          }}
                          disabled={quantity <= 1}
                        >
                          –
                        </button>
                        <span className="cart-item__quantity-value">
                          {quantity}
                        </span>
                        <button
                          className="cart-item__quantity-btn"
                          onClick={() => {
                            updateQuantity(product, quantity + 1);
                            // Add a small timeout to ensure state updates properly
                            setTimeout(() => {
                              // Force component to re-render
                              setAllProducts([...allProducts]);
                            }, 100);
                          }}
                        >
                          +
                        </button>
                      </div>

                      <div className="cart-item__price">${product.price}</div>
                    </div>
                  );
                })}
              </>
            ) : (
              <div className="cart-loading">
                <p>Looking for cart items...</p>
                <p className="cart-debug">Items in cart: {cartItems.length}</p>
                <p className="cart-debug">
                  Products found: {allProducts.length}
                </p>
                <p className="cart-debug">
                  Cart product IDs:{' '}
                  {cartItems.map(item => item.productId).join(', ')}
                </p>
              </div>
            )}
          </div>

          <div className="cart-summary">
            <h3 className="cart-summary__title">${summaryTotalPrice}</h3>
            <p className="cart-summary__subtitle">
              Total for {summaryTotalItems}{' '}
              {summaryTotalItems === 1 ? 'item' : 'items'}
            </p>
            <div className="cart-summary__divider"></div>
            <button className="cart-summary__checkout-btn">Checkout</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
