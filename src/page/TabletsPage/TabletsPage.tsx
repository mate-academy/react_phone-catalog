import { useProducts } from '../../context/ProductsContext';
import { PicturesSlider } from '../../components/PicturesSlider';
import { ProductsSlider } from '../../components/ProductsSlider';
import styles from './TabletsPage.module.scss';
import { Categories } from '../../components/Categories';
import { Footer } from '../../components/Footer';

const TabletsPage = () => {
  const { products, phones, accessories, tablets } = useProducts();
  const newestProducts = products.sort((a, b) => b.year - a.year).slice(0, 10);
  const hotPricesProducts = products
    .sort((a, b) => {
      const discountA = a.fullPrice - a.price;
      const discountB = b.fullPrice - b.price;

      return discountB - discountA;
    })
    .slice(0, 10);

  return (
    <div className={styles.home}>
      <h1>Tablets Page</h1>

      <Footer />
    </div>
  );
};

export default TabletsPage;
