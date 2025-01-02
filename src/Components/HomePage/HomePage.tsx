import { Categories } from '../Categories/Categories';
import { MainSlider } from '../MainSlider/MainSlider';
import { Navigation } from '../Navigation/Navigation';
import { CartPage } from '../CartPage/CartPage';
import home from './HomePage.module.scss';
import { Footer } from '../Footer/Footer';
import { useContext } from 'react';
import { CatalogContext } from '../CatalogProvider';
import { ErrorScreen } from '../ErrorScreen/ErrorScreen';

export const HomePage = () => {
  const { products, themeSwitcher, error } = useContext(CatalogContext);

  const getNewestProducts = products.sort((a, b) => b.year - a.year);

  const getProductsWithDiscount = products.sort((a, b) => b.price - a.price);

  return (
    <>
      <Navigation />
      {!error ? (
        <>
          <h1 className={home.home__phonecatalog}>Phone Catalog</h1>
          <div
            className={home.home}
            data-theme={themeSwitcher ? 'dark' : 'light'}
          >
            <h1 className={home.home__title}>Welcome to Nice Gadgets store!</h1>
            <MainSlider />
            <CartPage
              showedProducts={getNewestProducts}
              swiperTitle="Brand new models"
            />
            <Categories />
            <CartPage
              showedProducts={getProductsWithDiscount}
              swiperTitle="Hot prices"
            />
          </div>
        </>
      ) : (
        <ErrorScreen />
      )}
      <Footer />
    </>
  );
};
