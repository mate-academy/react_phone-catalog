import './cartPage.scss';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AllProductsType } from '../../types/AllProductsType';
import { AddAndFavoritesContext } from '../contexts/AddAndFavoritesContext';
import { useProductFilters } from '../../hooks/useProductFilters';

export const CartPage = () => {
  const context = useContext(AddAndFavoritesContext);
  const { getLastSearch, getLastPath } = useProductFilters();
  const { cart, changeQuantity, clearCart } = context;

  const [products, setProducts] = useState<AllProductsType[]>([]);
  const [allProducts, setAllProducts] = useState<AllProductsType[]>([]);
  const [orderMessage, setOrderMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch('api/products.json')
      .then(res => res.json())
      .then((data: AllProductsType[]) => setAllProducts(data));
  }, []);

  useEffect(() => {
    const productsInCart = allProducts.filter(product =>
      cart.some(item => item.id === product.id),
    );
    setProducts(productsInCart);
  }, [cart, allProducts]);

  let cartTotalSum = 0;
  const itemInCart = cart.length;

  const getProductLink = (product: AllProductsType) => {
    return `/${product.category}/${product.itemId}`;
  };

  const handleCheckout = () => {
    clearCart();
    setOrderMessage('Ваше замовлення успішно відправлено');

    setTimeout(() => setOrderMessage(null), 5000);
  };

  const closeMessage = () => setOrderMessage(null);

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="cart-page">
      <div className="button-back-block">
        <Link to={`${getLastPath()}${getLastSearch()}`} className="icon">
          <img
            src="img/icons/ArrowLeft.svg"
            alt="arrow icon"
            className="icon"
          />
        </Link>

        <Link
          to={`${getLastPath()}${getLastSearch()}`}
          className="breadcrumbs-link"
        >
          <div className="back-text">Back</div>
        </Link>
      </div>

      <div className="page-title">Cart</div>

      {itemInCart > 0 ? (
        <div className="cart-section">
          <div className="card-box">
            {products.map(product => {
              const modelPhoto = product.image;
              const modelName = product.name;
              const price = product.price;
              const id = product.id;

              const cartItem = cart.find(item => item.id === product.id);
              const quantity = cartItem?.quantity ?? 1;
              const modelSum = price * quantity;

              cartTotalSum += modelSum;

              const productLink = getProductLink(product);

              return (
                <div className="carts-card" key={id}>
                  <div className="info-row">
                    <div
                      className="delete"
                      onClick={() => changeQuantity(id, 'delete')}
                    >
                      <img src="img/icons/Close.svg" alt="delete item" />
                    </div>

                    <Link to={productLink} className="model-link photo">
                      <img src={modelPhoto} alt="model photo" />
                    </Link>

                    <Link to={productLink} className="model-link modelName">
                      {modelName}
                    </Link>
                  </div>

                  <div className="calc-box">
                    <div
                      className="minus calc-button"
                      onClick={() => changeQuantity(id, 'minus')}
                    >
                      <img src="img/icons/Minus.svg" alt="minus" />
                    </div>

                    <div className="count">{quantity}</div>

                    <div
                      className="plus calc-button"
                      onClick={() => changeQuantity(id, 'plus')}
                    >
                      <img src="img/icons/Plus.svg" alt="plus" />
                    </div>
                  </div>

                  <h3 className="price">${modelSum}</h3>
                </div>
              );
            })}
          </div>

          <div className="totalForItem">
            <div className="totalItem-Price">${cartTotalSum}</div>
            <p className="main-body-text-14">Total for {totalQuantity} items</p>
            <button className="checkout button-text" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="img-box">
          {orderMessage && (
            <div className="order-message" onClick={closeMessage}>
              {orderMessage}
              <span className="close-message">
                ×
              </span>
            </div>
          )}

          <h4 className="empty-text">Cart is empty</h4>
          <img
            src="img/cart-is-empty.png"
            alt="cart is empty"
            className="cart-is-empty"
          />
        </div>
      )}
    </div>
  );
};
