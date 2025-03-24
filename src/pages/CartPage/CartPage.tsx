import { useProducts } from '../../context/ProductsContext';
import { PicturesSlider } from '../../components/PicturesSlider';
import { ProductsSlider } from '../../components/ProductsSlider';
import styles from './CartPage.module.scss';
import { Categories } from '../../components/Categories';
import { Footer } from '../../components/Footer';

const CartPage = () => {
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
      <h1>Cart Page</h1>

    </div>
  );
};

export default CartPage;
