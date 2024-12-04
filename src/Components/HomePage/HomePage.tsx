import { Categories } from '../Categories/Categories';
import { MainSlider } from '../MainSlider/MainSlider';
import { Navigation } from '../Navigation/Navigation';
import { CartPage } from '../CartPage/CartPage';
import home from './HomePage.module.scss';
import { Footer } from '../Footer/Footer';
import { Discounts } from '../Discounts/Discounts';
import { useContext } from 'react';
import { CatalogContext } from '../CatalogProvider';

export const HomePage = () => {
  const { products } = useContext(CatalogContext);

  const getNewestProducts = products.sort((a, b) => {
    if (a.ProductData && b.ProductData) {
      return b.ProductData?.priceDiscount - a.ProductData?.priceDiscount;
    }

    return 1;
  });

  return (
    <>
      <Navigation />
      <h1 className={home.home__phonecatalog}>Phone Catalog</h1>
      <div className={home.home}>
        <h1 className={home.home__title}>Welcome to Nice Gadgets store!</h1>
        <MainSlider />
        <CartPage
          showedProducts={getNewestProducts}
          swiperTitle="Brand new models"
        />
        <Categories />
        <Discounts />
      </div>
      <Footer />
    </>
  );
};
