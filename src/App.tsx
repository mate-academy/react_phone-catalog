import { HomePage } from './modules/HomePage';
import { ProductPage } from './modules/ProductPage';
import { Footer } from './shared/components/Footer';
import { Header } from './shared/components/Header';

export const App = () => {
  return (
    <>
      <Header />
      <HomePage />
      <ProductPage />
      <Footer />
    </>
  );
};
