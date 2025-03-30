import { useLocation } from 'react-router-dom';
import styles from './ProductDetailsPage.module.scss';
import { useProducts } from '../../context/ProductsContext';
import { useEffect, useState } from 'react';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import BackIcon from '../../components/BackIcon/BackIcon';
import ProductDetails from '../../components/ProductDetails/ProductDetails';
import { Gadget } from '../../types/Gadgets';

const ProductDetailsPage = () => {
  const [product, setProduct] = useState<Gadget | null>(null);

  const { error, loading, getGadgetById } = useProducts();
  const { pathname } = useLocation();

  const splittedPath = pathname.split('/');

  const itemId = splittedPath[2];
  const category = splittedPath[1];

  useEffect(() => {
    getGadgetById(category, itemId).then(res => setProduct(res));
  }, [pathname]);

  useEffect(() => {
    // console.log(product, 'product');
  }, [product]);

  // if (loading) {
  //   return <h1>Loading</h1>;
  // }

  if (error) {
    return <h1>Error</h1>;
  }
  if (product) {
    return (
      <div className={styles.productDetailsPage}>
        <Breadcrumbs />

        <BackIcon />

        <ProductDetails product={product} />
      </div>
    );
  }
};

export default ProductDetailsPage;
