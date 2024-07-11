import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import '../styles/common.scss';

export const NotFoundProduct = () => {
  return (
    <>
      <Header />
      <h2 className="page-not-found-title">Product not found</h2>
      <img src="img/product-not-found.png" alt="" />
      <Footer />
    </>
  );
};
