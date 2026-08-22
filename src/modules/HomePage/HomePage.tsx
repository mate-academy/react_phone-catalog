import { getProducts } from '../../api/products';
import { useFetch } from '../../hooks/useFetch';
import { ProductsSkeleton } from '../shared/components/ProductsSkeleton';
import { ProductsSlider } from '../shared/components/ProductsSlider';
import { ErrorMessage } from '../shared/components/RequestStatus';
import { PicturesSlider } from './components/PicturesSlider';
import { ShopByCategory } from './components/ShopByCategory';
import { Product } from '../../types/Product';
import styles from './HomePage.module.scss';

function getHotPrices(products: Product[]): Product[] {
  const discounted = products.filter(
    product => product.fullPrice > product.price,
  );

  return discounted.sort((a, b) => {
    const discountA = a.fullPrice - a.price;
    const discountB = b.fullPrice - b.price;

    return discountB - discountA;
  });
}

export const HomePage: React.FC = () => {
  const { data: products, loading, error } = useFetch(getProducts, []);

  const hotPrices = products ? getHotPrices(products) : [];

  const brandNew = products
    ? [...products].sort((a, b) => b.year - a.year)
    : [];

  return (
    <div className={`container ${styles.homePage}`}>
      <h1 className="visually-hidden">Product Catalog</h1>
      <p className={styles.homePage__welcome}>Welcome to Nice Gadgets store!</p>

      <PicturesSlider />

      {loading && <ProductsSkeleton count={4} />}
      {error && <ErrorMessage />}

      {products && (
        <>
          <ProductsSlider title="Brand new models" products={brandNew} />
          <ShopByCategory products={products} />
          <ProductsSlider title="Hot prices" products={hotPrices} />
        </>
      )}
    </div>
  );
};
