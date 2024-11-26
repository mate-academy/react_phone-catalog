import { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styles from './ProductDetailPage.module.scss';
import { getProductById } from '../../services/products';
import { ProductDetails } from '../../types/ProductDetails';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { GadgetDetails } from '../../components/GadgetDetails';
import { handleClickToTop } from '../../helpers/scrollToTop';
import { Loader } from '../../components/Loader';
import { GadgetError } from '../../components/NotificationError/GadgetError';
import { AboutGadget } from '../../components/AboutGadget';
import { getSuggestedProducts } from '../../helpers/getSuggestedProducts';
import { ProductsContext } from '../../store/ProductsContext';
import { ProductSlider } from '../../components/ProductsSlider';

export const ProductDetailsPage = () => {
  const { itemId } = useParams();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { pathname } = useLocation();
  const nameOfPath = pathname.slice(1).split('/')[0];

  const { products } = useContext(ProductsContext);

  const suggestedProducts = itemId
    ? getSuggestedProducts(products, itemId)
    : [];

  useEffect(() => {
    handleClickToTop();
    setLoading(true);

    if (itemId) {
      getProductById(nameOfPath, itemId)
        .then(gadget => {
          if (!gadget) {
            throw new Error('Product not found');
          }

          setProduct(gadget);
        })
        .catch(() => {
          setError('Product not found');
          setProduct(null);
        })
        .finally(() => setLoading(false));
    }
  }, [nameOfPath, itemId]);

  if (error) {
    return <GadgetError />;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.details}>
      <div className={styles.details__container}>
        <div className={styles.details__breadcrumbs}>
          <Breadcrumbs product={product} />
        </div>

        {product && (
          <>
            <div className={styles.details__gadget}>
              <GadgetDetails product={product} />
            </div>
            <div className={styles.details__desc}>
              <AboutGadget product={product} />
            </div>
            <div>
              <ProductSlider
                products={suggestedProducts}
                title="You may also like"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
