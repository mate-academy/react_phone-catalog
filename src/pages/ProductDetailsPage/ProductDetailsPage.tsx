import { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styles from './ProductDetailPage.module.scss';
import { getGadgetById, getProductById } from '../../services/products';
import { ProductDetails } from '../../types/ProductDetails';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { GadgetDetails } from '../../components/GadgetDetails';
import { handleClickToTop } from '../../helpers/scrollToTop';
import { Loader } from '../../components/Loader';
import { ProductError } from '../../components/Errors/ProductError';
import { AboutGadget } from '../../components/AboutGadget';
import { getSuggestedProducts } from '../../helpers/getSuggestedProducts';
import { ProductsContext } from '../../store/ProductsContext';
import { Product } from '../../types/Product';
import { YouMayAlsoLike } from '../../components/ProductsSlider/YouMayAlsoLike';

export const ProductDetailsPage = () => {
  const { itemId } = useParams();
  const [gadget, setGadget] = useState<ProductDetails | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { pathname } = useLocation();
  const nameOfPath = pathname.slice(1).split('/')[0];

  const { products } = useContext(ProductsContext);

  const suggestedProducts = itemId
    ? getSuggestedProducts(products, itemId)
    : [];

  useEffect(() => {
    const fetchData = async () => {
      handleClickToTop();
      setLoading(true);

      try {
        const gadgetPromise = itemId
          ? getGadgetById(nameOfPath, itemId)
          : Promise.resolve(null);

        const productPromise = itemId
          ? getProductById(itemId)
          : Promise.resolve(null);

        const [gadgetItem, productItem] = await Promise.all([
          gadgetPromise,
          productPromise,
        ]);

        if (itemId && !gadgetItem) {
          throw new Error('Gadget not found');
        }

        if (itemId && !productItem) {
          throw new Error('Product not found');
        }

        setGadget(gadgetItem);
        setProduct(productItem);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (errorMessage: any) {
        setError(errorMessage);
        setGadget(null);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [nameOfPath, itemId]);

  if (error) {
    return <ProductError />;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.details}>
      <div className={styles.details__container}>
        <div className={styles.details__breadcrumbs}>
          <Breadcrumbs gadget={gadget} />
        </div>

        {!gadget || !product ? (
          <Loader />
        ) : (
          <>
            <div className={styles.details__gadget}>
              <GadgetDetails gadget={gadget} product={product} />
            </div>
            <div className={styles.details__desc}>
              <AboutGadget gadget={gadget} />
            </div>
          </>
        )}
      </div>

      <div className={styles.details__suggested}>
        <YouMayAlsoLike
          products={suggestedProducts}
          title="You may also like"
        />
      </div>
    </div>
  );
};
