import { Link } from 'react-router-dom';
import { BasketItem } from '../BasketItem/BasketItem';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import './BasketPage.scss';
import { useBasket } from '../../utils/Stores';
import { Product } from '../../types/Propduct';

export const BasketPage = () => {
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

  return (
    <>
      <Header />
      <main className="basket-page">
        <Link to={`/`} className="return-button">
          <img src="./img/arrow-prev.svg" alt="return" />
          <span>Back</span>
        </Link>
        <h1 className="basket-page__title">Cart</h1>
        <div className="basket-page__product-box">
          {checkedArray().map(product => (
            <BasketItem
              key={product.id}
              idFromParam={product.itemId}
              category={product.category}
            />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};
