import { Footer } from '../HomePage/components/Footer';
import { Header } from '../HomePage/components/Header';
import { ProductDetails } from './ProductDetails';
import style from './ProductDetailsPage.module.scss';

export const ProductDetailsPage = () => {
  return (
    <>
      <Header />
      <div className={style.container}>
        <ProductDetails />
        <Footer />
      </div>
    </>
  );
};
