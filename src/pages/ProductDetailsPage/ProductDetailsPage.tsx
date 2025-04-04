import { useLocation } from 'react-router-dom';
import styles from './ProductDetailsPage.module.scss';
import { useProducts } from '../../context/ProductsContext';
import { useEffect, useState } from 'react';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import BackIcon from '../../components/BackIcon/BackIcon';
import ProductDetails from '../../components/ProductDetails/ProductDetails';
import { Gadget } from '../../types/Gadgets';
import { ProductsSlider } from '../../components/ProductsSlider';
import { getRandomProducts } from '../../utils';
import Loader from '../../components/Loader/Loader';

export const ProductDetailsPage = () => {
  const { getGadgetById, products } = useProducts();
  const [product, setProduct] = useState<Gadget>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { pathname } = useLocation();

  const splittedPath = pathname.split('/');
  const itemId = splittedPath[2];
  const category = splittedPath[1];

  const randomProducts = getRandomProducts(products, 10);

  useEffect(() => {
    const delay = (ms: number) =>
      new Promise(resolve => setTimeout(resolve, ms));

    const fetchProduct = async () => {
      setLoading(true);
      setError(false);

      try {
        await delay(1000);

        const result = await getGadgetById(category, itemId);

        if (result) {
          setProduct(result);
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [pathname, category, getGadgetById, itemId]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <h1 className={styles.product_not_found}>Product Not Found</h1>;
  }

  if (product) {
    return (
      <div className={styles.productDetailsPage}>
        <Breadcrumbs />
        <BackIcon />
        <ProductDetails product={product} />
        <ProductsSlider
          title="You may also like"
          visibleProducts={randomProducts}
        />
      </div>
    );
  }

  return null;
};
