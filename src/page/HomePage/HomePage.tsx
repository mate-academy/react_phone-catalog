import { useProducts } from '../../context/ProductsContext';
import { PicturesSlider } from '../../components/PicturesSlider';
import { ProductsSlider } from '../../components/ProductsSlider';
import styles from './HomePage.module.scss';
import { Categories } from '../../components/Categories';
import { Footer } from '../../components/Footer';

const HomePage = () => {
  const { products, phones, accessories, tablets } = useProducts();
  const newestProducts = products.sort((a, b) => b.year - a.year).slice(0, 10);
  const hotPricesProducts = products
    .sort((a, b) => {
      const discountA = a.fullPrice - a.price;
      const discountB = b.fullPrice - b.price;

      return discountB - discountA;
    })
    .slice(0, 10);

  console.log(hotPricesProducts);

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
