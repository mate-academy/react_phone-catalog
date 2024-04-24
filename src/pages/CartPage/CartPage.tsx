import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { actions as productsActions } from '../../store/reducers/products';
import { handleLocalStorage } from '../../utils/helpers/helpers';

export const CartPage = () => {
  const dispatch = useAppDispatch();
  const { viewportWidth } = useAppSelector(state => state.viewport);
  const { cart } = useAppSelector(state => state.products);

  const [duplicateCart, setDuplicateCart] = useState([...cart]);
  const [isPaymentMethodShown, setIsPaymentMethodShown] = useState(false);
  const navigate = useNavigate();

  // Отримання та оновлення значення itemsCount з локального сховища
  const [itemsCount, setItemsCount] = useState(
    handleLocalStorage('itemsCount'),
  );

  /* handler functions start */

  const removeFromCart = (valueId: string) => {
    const updated = duplicateCart.filter(
      (item: Product) => item.id !== valueId,
    );

    // Видалення елемента з кошика
    localStorage.setItem('cart', JSON.stringify(updated));
    dispatch(productsActions.removeFromCart(valueId));

    // Оновлення itemsCount у локальному сховищі
    const updatedCount = { ...itemsCount };

    delete updatedCount[valueId];
    localStorage.setItem('itemsCount', JSON.stringify(updatedCount));
    setItemsCount(updatedCount);
  };

  const addDuplicate = (duplicate: Product) => {
    // Додавання дублікату у кошик
    const updatedCount = {
      ...itemsCount,
      [duplicate.id]: (itemsCount[duplicate.id] || 0) + 1,
    };

    localStorage.setItem('itemsCount', JSON.stringify(updatedCount));
    setItemsCount(updatedCount);

    setDuplicateCart(prev => [...prev, duplicate]);
  };

  const removeDuplicate = (valueId: string) => {
    const toRemove = duplicateCart.findIndex(item => item.id === valueId);

    // Видалення дублікату з кошика
    const updatedCount = { ...itemsCount };

    updatedCount[valueId] = Math.max((itemsCount[valueId] || 0) - 1, 0);
    localStorage.setItem('itemsCount', JSON.stringify(updatedCount));
    setItemsCount(updatedCount);

    setDuplicateCart(prev => {
      const toReturn = [...prev];

      toReturn.splice(toRemove, 1);

      return toReturn;
    });
  };

  const handleGoBack = () => navigate(-1);

  /* handler functions end */

  const getItemCount = (productId: string) => {
    return itemsCount[productId] + 1 || 1;
  };

  const totalPrice = duplicateCart.reduce((sum, product) => {
    const count = itemsCount[product.id] + 1 || 1;

    return sum + product.priceDiscount * count;
  }, 0);

  const totalItems = duplicateCart.reduce((sum, product) => {
    const count = itemsCount[product.id] + 1 || 1;

    return sum + count;
  }, 0);

  useEffect(() => {
    setItemsCount(handleLocalStorage('itemsCount')); // Оновлення itemsCount при зміні кошика
    setDuplicateCart([...cart]);
  }, [cart]);

  useEffect(() => {
    const updatedDuplicateCart = cart.map(product => {
      const count = itemsCount[product.id] || 1; // Отримати кількість з itemsCount
      const updatedProduct = { ...product, count }; // Оновити кількість в продукті

      return updatedProduct;
    });

    setDuplicateCart(updatedDuplicateCart); // Оновити стан duplicateCart
  }, [cart, itemsCount]);

  const getLink = (item: Product) => {
    const category = item.category.toLowerCase();

    return `/${category}/${item.id}`;
  };

  /* JSX pieces start */

  const getCartItem = (product: Product) => {
    return (
      <>
        <button
          className="cart-item__delete"
          onClick={() => removeFromCart(product.id)}
        />

        <Link to={getLink(product)} className="cart-item__link">
          <img
            className="cart-item__img"
            src={product.images[0]}
            alt="cart-item"
          />
        </Link>

        <p className="cart-item__title">{product.name}</p>
      </>
    );
  };

  const getCartItems = (product: Product) => {
    return (
      <>
        <div className="cart-item__counter">
          <button
            className="cart-item__icon"
            onClick={() => removeDuplicate(product.id)}
            disabled={getItemCount(product.id) === 1}
          >
            <div className="cart-item__minus" />
          </button>

          <p className="cart-item__count">{getItemCount(product.id)}</p>

          <button
            className="cart-item__icon"
            onClick={() => addDuplicate(product)}
          >
            <div className="cart-item__plus" />
          </button>
        </div>

        <p className="cart-item__price">${product.priceDiscount}</p>
      </>
    );
  };

  /* JSX pieces end */

  const handlePaymentMethod = () => {
    setIsPaymentMethodShown(!isPaymentMethodShown);
  };

  return (
    <section className="cart">
      <div className="cart__link-back" onClick={handleGoBack}>
        <div className="cart__arrow" />
        <p className="cart__link-text">Back</p>
      </div>

      <h2 className="cart__title">Cart</h2>

      <div className="cart__cart">
        {cart?.length ? (
          <>
            <div className="cart__items">
              {cart.map(product => (
                <article className="cart-item" key={product.id}>
                  {viewportWidth < 640 ? (
                    <>
                      <div className="cart-item__item">
                        {getCartItem(product)}
                      </div>
                      <div className="cart-item__items">
                        {getCartItems(product)}
                      </div>
                    </>
                  ) : (
                    <>
                      {getCartItem(product)}
                      {getCartItems(product)}
                    </>
                  )}
                </article>
              ))}
            </div>

            <div className="cart__checkout checkout">
              {isPaymentMethodShown ? (
                <div className="checkout__payment-method">
                  Payment-method logic can be added later on
                </div>
              ) : (
                <div className="checkout__description">
                  <p className="checkout__price">${totalPrice}</p>
                  <p className="checkout__items-count">
                    Total for {totalItems}&nbsp;
                    {totalItems === 1 ? 'device' : 'devices'}
                  </p>
                </div>
              )}
              <button
                className="checkout__button"
                onClick={handlePaymentMethod}
              >
                Checkout
              </button>
            </div>
          </>
        ) : (
          <div className="empty-page">
            <article className="empty-page__card">
              <h3 className="empty-page__title">
                Looks like the cart is asleep
              </h3>
              <Link to="/" className="empty-page__button">
                Wake it up
              </Link>
            </article>
            <div className="empty-page__img-grid">
              <div className="empty-page__img empty-page__img--cart" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
