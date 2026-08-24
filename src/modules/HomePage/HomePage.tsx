import styles from './homePage.module.scss';
import products from '../../../public/api/products.json';
import { PicturesSlider } from '../../components/PicturesSlider/PicturesSlider';
import { Categories } from '../../components/Categories/Categories';
import { HotPrices } from '../../components/HotPrices/HotPrices';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { useProducts } from '../../hooks/usePoducts';
import { Loader } from '../../components/Loader';

export const HomePage = () => {
  const { loading } = useProducts();

  const models = products.filter(
    gadget =>
      gadget.name.includes('iPhone 14 128GB') ||
      gadget.name.includes('iPhone 14 Pro 128GB') ||
      gadget.name.includes('iPad Pro 11 (2021) 128GB') ||
      gadget.name.includes('iPad Mini (6th Gen) 256GB') ||
      gadget.name.includes('Apple Watch Series 6 44mm'),
  );

  return (
    <div className={styles.Container}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.home_page}>
            <h1 className={styles.title}>Product Catalog</h1>
            <h2 className={styles.home_page__title}>
              Welcome to Nice Gadgets store!
            </h2>
            <PicturesSlider />
          </div>
          <ProductsSlider title="Brand new models" products={models} />
          <Categories />
          <HotPrices />
        </>
      )}
    </div>
  );
};
