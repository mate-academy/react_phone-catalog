import { useNavigate } from 'react-router-dom';
import { BasketItem } from '../BasketItem/BasketItem';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import './BasketPage.scss';
import { useBasket } from '../../utils/Stores';
import { Product } from '../../types/Propduct';

export const BasketPage = () => {
  const navigate = useNavigate();

  const basketStore = useBasket(state => state.basket);

  const checkedArray = () => {
    const newBasketStore: Product[] = [];

    basketStore.forEach(product => {
      if (
        !newBasketStore.find(productNew => productNew.itemId === product.itemId)
      ) {
        newBasketStore.push(product);
      }
    });

    return newBasketStore;
  };

  let totalPrice = 0;

  basketStore.forEach(product => (totalPrice += product.price));

  return (
    <>
      <Header />
      <main className="basket-page">
        <button
          onClick={() => navigate(-1)}
          className="return-button basket-page__return-button"
        >
          <img src="./img/arrow-prev.svg" alt="return" />
          <span>Back</span>
        </button>
        <h1 className="basket-page__title">Cart</h1>
        {checkedArray().length !== 0 ? (
          <>
            <div className="basket-page__product-box">
              {checkedArray().map(product => (
                <BasketItem
                  key={product.id}
                  idFromParam={product.itemId}
                  category={product.category}
                />
              ))}
            </div>
            <div className="basket-page__final-box">
              <h5 className="basket-page__total-price">${totalPrice}</h5>
              <p className="basket-page__total-counter">
                Total for {basketStore.length}{' '}
                {basketStore.length === 1 ? 'item' : 'items'}
              </p>
              <div className="line" />
              <button className="basket-page__send-button">Checkout</button>
            </div>
          </>
        ) : (
          <div className="image-box">
            <img
              src="./img/cart-is-empty.png"
              alt="no products in cart"
              className="basket-page__no-products-image"
            />
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};
