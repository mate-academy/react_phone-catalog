import styles from './ProductDetails.module.scss';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { ProductNav } from '../ProductNav';
import { ProductSlider } from '../HomePage/components/ProductSlider';
import { Loader } from '../components/Loader';
import { BackLink } from '../components/BackLink';
// eslint-disable-next-line max-len
import { ProductCharacteristics } from './ProductCharacteristics/ProductCharacteristics';
import { getGadget } from '../../utils/gadgets';
import {
  getProductById,
  getSuggestedProducts,
} from '../../utils/sortingProducts';
import { Category } from '../../types/Category';
import { Products } from '../../types/Products';
import { TypeGadget } from '../../types/Gadget';

export const ProductDetails = () => {
  const [currentGadget, setCurrentGadget] = useState<TypeGadget | null>(null);
  const [currentProduct, setCurrentProduct] = useState<Products | null>(null);
  const [suggestedProducts, setSuggestedProducts] = useState<Products[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();
  const location = useLocation();
  const category = location.pathname.split('/')[1] as Category;
  const id = params.id as string;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const gadget = await getGadget(category, id);
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
    <div className={styles['product-details']}>
      <div className={styles['product-details__nav']}>
        <ProductNav />
        <BackLink />
      </div>

      {currentGadget && currentProduct ? (
        <>
          <ProductCharacteristics
            gadget={currentGadget}
            products={currentProduct}
          />
          <ProductSlider
            title="You may also like"
            products={suggestedProducts}
          />
        </>
      ) : (
        <div className={styles['product-details__error']}>
          <p className={styles['product-details__error-text']}>
            Product was not found
          </p>
          <img
            className={styles['product-details__error-image']}
            src="/img/product-not-found.png"
            alt="Product not found"
          />
        </div>
      )}
    </div>
  );
};
