import { Breadcrumbs } from '../../components/Breadcrumbs';

import styles from './ProductPage.module.scss';
import { BackLink } from '../../components/BackLink';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getGadgetById } from '../../servises/gadgets';
import { Category, Product, GadgetType } from '../../types';

import { ProductsSlider } from '../../components/ProductsSlider';
import { getHotPriceProducts, getProductById } from '../../servises/products';
import { Gadget } from './components/Gadget';

export const ProductPage = () => {
  const [currentGadget, setCurrentGadget] = useState<GadgetType | null>(null);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [hotPrices, setHotPrices] = useState<Product[]>([]);

  const params = useParams();
  const location = useLocation();

  const category = location.pathname.split('/')[1] as Category;

  const id = params.id;

  useEffect(() => {
    if (id && category) {
      getGadgetById(category, id).then(setCurrentGadget);
      getProductById(id).then(setCurrentProduct);
    }

    getHotPriceProducts().then(setHotPrices);
  }, [category, id]);

  if (!currentGadget || !currentProduct) {
    return <p>not found</p>;
  }

  return (
    <div className={styles['product-page']}>
      <div className={styles['product-page__nav-wrapper']}>
        <Breadcrumbs />
        <BackLink />
      </div>
      <Gadget
        gadget={currentGadget}
        product={currentProduct}
        className={styles['product-page__gadget']}
      />
      <ProductsSlider title="You may also like" products={hotPrices} />
    </div>
  );
};
