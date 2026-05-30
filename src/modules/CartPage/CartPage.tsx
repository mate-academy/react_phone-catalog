import { Footer } from '../HomePage/components/Footer';
import { Header } from '../HomePage/components/Header';
import { Cart } from './Cart';
import style from './CartPage.module.scss';

export const CartPage = () => {
  return (
    <>
      <Header />
      <div className={style.container}>
        <Cart />
        <Footer />
      </div>
    </>
  );
};
