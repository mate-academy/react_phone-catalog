import { Breadcrumbs } from '../../components/Breadcrumbs';

import styles from './ProductPage.module.scss';
import { BackLink } from '../../components/BackLink';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getGadgetById } from '../../servises/gadgets';
import { Category, Product } from '../../types';

import { ProductsSlider } from '../../components/ProductsSlider';
import { getHotPriceProducts } from '../../servises/products';
import { Gadget } from './components/Gadget';
import { GadgetType } from '../../types/Gadget';

export const ProductPage = () => {
  const [currentGadget, setCurrentGadget] = useState<GadgetType | null>(null);
  const [hotPrices, setHotPrices] = useState<Product[]>([]);

  const params = useParams();
  const location = useLocation();

  const category = location.pathname.split('/')[1] as Category;

  const id = params.id;

  useEffect(() => {
    if (id && category) {
      getGadgetById(category, id).then(setCurrentGadget);
    }

    getHotPriceProducts().then(setHotPrices);
  }, [category, id]);

  if (!currentGadget) {
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
        className={styles['product-page__gadget']}
      />
      <ProductsSlider title="You may also like" products={hotPrices} />
    </div>
  );
};
