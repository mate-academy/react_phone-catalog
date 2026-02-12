import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { MainLayout } from '../../layout/MainLayout';

import styles from './ProductDetailsPage.module.scss';
import { PageTop } from './components/pageTop';
import { ProductPresentation } from './components/productPresentation';
import { About } from './components/about';
import { ProductsSlider } from '../shared/components/ProductsSlider';
import { TechSpecs } from './components/techSpecs';
import { Products } from '../../types/Products';
import { getSuggestedProducts } from '../../utils/getSuggestedProducts';
import { fetchPhones } from '../../features/phoneSlice/phones';
import { fetchAccessories } from '../../features/accessoriesSlice/accessories';
import { fetchTablets } from '../../features/tabletsSlice/tablets';
import { ProductCategoryState } from '../../types/ProductsGroup';
import { Loader } from '../shared/components/loader';

export const ProductDetailsPage: React.FC = () => {
  const [alsoLike, setAlsoLike] = useState<Products[]>([]);
  const [productForButton, setproductForButton] = useState<Products>();
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();
  const { productId } = useParams();

  const productCategory = pathname.split('/')[1] as keyof ProductCategoryState;
  const { products, loading: loadingProduct } = useAppSelector(
    s => s[productCategory],
  );
  const allProducts = useAppSelector(s => s.products);

  const product = products.find(p => p.id === productId);

  useEffect(() => {
    dispatch(fetchPhones());
    dispatch(fetchAccessories());
    dispatch(fetchTablets());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]); // This ensures that the latest product data is loaded based on the URL parameter.

  useEffect(() => {
    if (allProducts.products.length === 0) {
      return;
    }

    const randomProduct = getSuggestedProducts(allProducts.products);

    setAlsoLike(randomProduct);
    setproductForButton(allProducts.products.find(p => p.itemId === productId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allProducts.products, pathname]);

  if (loadingProduct || allProducts.loading) {
    return (
      <MainLayout>
        <Loader />
      </MainLayout>
    );
  }

  if (!product || !productForButton) {
    return (
      <MainLayout>
        <h1>Product was not found.</h1>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <PageTop product={product} />

      <div className={styles.sections}>
        <ProductPresentation
          productForButton={productForButton}
          product={product}
        />

        <About product={product} />

        <TechSpecs product={product} />

        <section className={styles.alsoLike}>
          <ProductsSlider
            key={pathname}
            products={alsoLike}
            title="You may also like"
          />
        </section>
      </div>
    </MainLayout>
  );
};
