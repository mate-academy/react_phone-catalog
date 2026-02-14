import styles from './HomePage.module.scss';
import { PicturesSlider } from './components/PicturesSlider';
import { ProductsSlider } from '../../components/ProductsSlider';
import { Categories } from './components/Categories';
import { Error } from '../../components/Error';
import { Loader } from '../../components/Loader';
import { useFetchProducts } from '../../utils/useFetchProducts';

const NEW_MODEL = 'iPhone 14';

export const HomePage = () => {
  const { products, error, isLoading, fetchProducts } = useFetchProducts();

  const newModels = products
    .filter(product => product.name.includes(NEW_MODEL))
    .sort((a, b) => b.price - a.price)
    .slice(0, 12);

  const hotPricesModels = products
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
    .slice(0, 12);

  return (
    <div className={styles.homePage}>
      {isLoading && <Loader />}
      {error && !isLoading && <Error fetchProducts={fetchProducts} />}
      {!error && !isLoading && (
        <>
          <h1>Welcome to Nice Gadgets store!</h1>
          <PicturesSlider />
          <ProductsSlider
            products={newModels}
            type={'brandNew'}
            title={'Brand new models'}
          />
          <Categories />
          <ProductsSlider
            products={hotPricesModels}
            type={'hotPrices'}
            title={'Hot prices'}
          />
        </>
      )}
    </div>
  );
};
