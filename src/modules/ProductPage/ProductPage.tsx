import styles from './ProductPage.module.scss';
import { BackLink } from '../../components/BackLink';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getGadgetById } from '../../servises/gadgets';
import { Category, Product, GadgetType } from '../../types';

import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductsSlider } from '../../components/ProductsSlider';
import { getProductById, getSuggestedProducts } from '../../servises/products';
import { Gadget } from './components/Gadget';
import { Loader } from '../../components/Loader';

export const ProductPage = () => {
  const [currentGadget, setCurrentGadget] = useState<GadgetType | null>(null);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();
  const location = useLocation();

  const category = location.pathname.split('/')[1] as Category;

  const id = params.id as string;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const gadget = await getGadgetById(category, id);
        const product = await getProductById(id);
        const suggested = await getSuggestedProducts();

        setCurrentGadget(gadget);
        setCurrentProduct(product);
        setSuggestedProducts(suggested);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [category, id]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles['product-page']}>
      <div className={styles['product-page__nav-wrapper']}>
        <Breadcrumbs />
        <BackLink />
      </div>
      {!currentGadget || !currentProduct ? (
        <div className={styles['product-page__not-found']}>
          <p className={styles['product-page__not-found-text']}>
            Product was not found
          </p>
          <img
            className={styles['product-page__not-found-img']}
            src="img/product-not-found.png"
            alt="product not found"
          />
        </div>
      ) : (
        <>
          <Gadget
            gadget={currentGadget}
            product={currentProduct}
            className={styles['product-page__gadget']}
          />
          <ProductsSlider
            title="You may also like"
            products={suggestedProducts}
          />
        </>
      )}
    </div>
  );
};
