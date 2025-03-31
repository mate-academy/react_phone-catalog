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

const ProductDetailsPage = () => {
  const { products } = useProducts();
  const [product, setProduct] = useState<Gadget | null>(null);

  const { error, loading, getGadgetById } = useProducts();
  const { pathname } = useLocation();

  const splittedPath = pathname.split('/');

  const randomProducts = getRandomProducts(products, 10);

  const itemId = splittedPath[2];
  const category = splittedPath[1];

  useEffect(() => {
    getGadgetById(category, itemId).then(res => setProduct(res));
  }, [pathname]);

  // if (loading) {
  //   return <h1>Loading</h1>;
  // }

  if (error) {
    return <h1 className={styles.product_not_found}>Product Not Found</h1>;
  }

  if (product) {
    return (
      <div className={styles.productDetailsPage}>
        <Breadcrumbs />

        <BackIcon />

        <ProductDetails product={product} />

        {/* <ProductsSlider
          title="You may also like"
          visibleProducts={randomProducts}
        /> */}
      </div>
    );
  }
};

export default ProductDetailsPage;
