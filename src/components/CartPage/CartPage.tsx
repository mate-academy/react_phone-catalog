import React, { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../context/ProductContext';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { getProductIdentifier, Product } from '../../types/Product';
import './CartPage.scss';

// Імпортуємо дані продуктів безпосередньо з файлів
import { phones } from '../PhonesPage/PhonesPage';
import { tablets } from '../TabletsPage/TabletsPage';
import { accessories } from '../AccessoriesPage/AccessoriesPage';

export const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } =
    useCart();
  const { products: contextProducts } = useProducts();
  const navigate = useNavigate();

  // State to hold all products from all categories
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  // Get products from all categories on component mount
  useEffect(() => {
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
  }, [contextProducts]);

  // Log cart items for debugging
  useEffect(() => {
    // console logs for debugging
  }, [cartItems]);

  // Get products that are in the cart using our consistent identifier function
  const cartProducts = allProducts.filter(product => {
    const productId = getProductIdentifier(product);
    const isInCart = cartItems.some(item => item.productId === productId);

    if (isInCart) {
      // Found product in cart
    }

    return isInCart;
  });

  // Sort cart products to match the order in cartItems for consistent display
  cartProducts.sort((a, b) => {
    const aId = getProductIdentifier(a);
    const bId = getProductIdentifier(b);
    const aIndex = cartItems.findIndex(item => item.productId === aId);
    const bIndex = cartItems.findIndex(item => item.productId === bId);

    return aIndex - bIndex;
  });

  const getQuantity = (productId: string) => {
    const cartItem = cartItems.find(item => item.productId === productId);

    return cartItem ? cartItem.quantity : 0;
  };

  const totalPrice = getTotalPrice(allProducts);
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

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
                        onClick={() => removeFromCart(product)}
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
                          onClick={() => updateQuantity(product, quantity - 1)}
                          disabled={quantity <= 1}
                        >
                          –
                        </button>
                        <span className="cart-item__quantity-value">
                          {quantity}
                        </span>
                        <button
                          className="cart-item__quantity-btn"
                          onClick={() => updateQuantity(product, quantity + 1)}
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
            <h3 className="cart-summary__title">${totalPrice}</h3>
            <p className="cart-summary__subtitle">
              Total for {totalItems} items
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
