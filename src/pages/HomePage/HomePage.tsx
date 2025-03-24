import { useProducts } from '../../context/ProductsContext';
import { PicturesSlider } from '../../components/PicturesSlider';
import { ProductsSlider } from '../../components/ProductsSlider';
import styles from './HomePage.module.scss';
import { Categories } from '../../components/Categories';
import { Footer } from '../../components/Footer';
import { sortProductsByPrice, sortProductsByYear } from '../../utils';

const HomePage = () => {
  const { products, phones, accessories, tablets } = useProducts();

  const newestProducts = sortProductsByYear(products);

  const hotPricesProducts = sortProductsByPrice(products);

  return (
    <div className={styles.home}>
      <PicturesSlider />
      <ProductsSlider
        title="Brand new models"
        visibleProducts={newestProducts}
      />
      <Categories
        phonesQuantity={phones.length}
        tabletsQuantity={tablets.length}
        accessoriesQuantity={accessories.length}
      />

      <ProductsSlider title="Hot prices" visibleProducts={hotPricesProducts} />
      <Footer />
    </div>
  );
};

export default HomePage;
