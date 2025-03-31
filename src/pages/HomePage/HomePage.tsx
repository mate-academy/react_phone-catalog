import { useProducts } from '../../context/ProductsContext';
import styles from './HomePage.module.scss';
import { Categories } from '../../components/Categories';
import { sortProductsByPrice, sortProductsByYear } from '../../utils';
import PicturesSlider from '../../components/PicturesSlider/PicturesSlider';
import { ProductsSlider } from '../../components/ProductsSlider';

const HomePage = () => {
  const { products, phones, accessories, tablets } = useProducts();

  const newestProducts = sortProductsByYear(products);

  const hotPricesProducts = sortProductsByPrice(products);

  return (
    <div className={styles.home}>
      <h1 className={styles.hidden_title}>Product Catalog</h1>
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

      <ProductsSlider
       title="Hot prices" visibleProducts={hotPricesProducts}
      />
    </div>
  );
};

export default HomePage;
