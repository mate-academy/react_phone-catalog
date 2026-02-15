import styles from './ProductInfoPage.module.scss';
import { Icon } from '../../components/Icon';
import { useNavigate, useParams } from 'react-router-dom';
import { useAllProducts } from '../../hooks/useAllProducts';
import { ProductAddInfo } from './components/ProductAddInfo';
import { AboutProduct } from './components/AboutProduct';
import { Gallery } from './components/Gallery';
import { ProductsSlider } from '../HomePage/components/ProductsSlider';
import { useProducts } from '../../hooks/useProducts';
import { getRandomProducts } from '../../utils/getRandomProducts';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { useErrorHandling } from '../../hooks/errorHandling';
import { NotFoundPage } from '../NotFoundPage';
import { Loader } from '../../components/Loader';

export const ProductInfoPage = () => {
  const { setIsError } = useErrorHandling();
  const { products } = useProducts(() => setIsError(true));
  const { allProducts } = useAllProducts(() => setIsError(true));
  const { productId } = useParams();

  const selectedProduct = allProducts.find(product => product.id === productId);

  const randomProducts = getRandomProducts(products);
  const navigate = useNavigate();

  if (products.length === 0 || allProducts.length === 0) {
    return <Loader />;
  }

  if (!selectedProduct) {
    return <NotFoundPage />;
  }

  return (
    <div className={styles.product}>
      <div className={styles.product__breadcrumbs}>
        <Breadcrumbs />
      </div>

      <button className={styles.product__back} onClick={() => navigate(-1)}>
        <div className={styles.product__icon}>
          <Icon type="arrowPrev" />
        </div>
        <span className={styles.product__btnText}>Back</span>
      </button>

      <>
        <h2 className={styles.product__name}>{selectedProduct.name}</h2>
        <div className={styles.product__details}>
          <div className={styles.product__images}>
            <Gallery selectedProduct={selectedProduct} />
          </div>

          <div className={styles.product__addInfo}>
            <ProductAddInfo selectedProduct={selectedProduct} />
          </div>

          <div className={styles.product__aboutInfo}>
            <AboutProduct selectedProduct={selectedProduct} />
          </div>
        </div>
        <div className={styles.product__slider}>
          <ProductsSlider
            products={randomProducts}
            title="You also may like"
            checkPrice
          />
        </div>
      </>
    </div>
  );
};
