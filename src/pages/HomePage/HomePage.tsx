import { useProducts } from '../../context/ProductsContext';
import styles from './HomePage.module.scss';
import { Categories } from '../../components/Categories';
import { sortProductsByPrice, sortProductsByYear } from '../../utils';
import PicturesSlider from '../../components/PicturesSlider/PicturesSlider';
import { ProductsSlider } from '../../components/ProductsSlider';
import { usePhones } from '../../context/PhonesContext';
import { useAccessories } from '../../context/AccessoriesContext';
import { useTablets } from '../../context/TabletsContext';

const HomePage = () => {
  const { products } = useProducts();
  const { tablets } = useTablets();
  const { accessories } = useAccessories();
  const { phones } = usePhones();

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
    </div>
  );
};

export default HomePage;
