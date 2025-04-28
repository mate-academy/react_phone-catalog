/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import styles from './ProductDetailsPage.module.scss';
import { useLocation, useParams } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { ProductDetail } from '../../types/productDetail';
import { TypeProduct } from '../../types/category';
import { getAccessories, getPhones, getTablets } from '../../api/products';
import { OverviewSection } from './sections/OverviewSection';
import { AboutSection } from './sections/AboutSection';
import classNames from 'classnames';
import { TechSpecsSection } from './sections/TechSpecsSection';
import ProductsSlider from '../../components/ProductsSlider/ProductsSlider';
import { Product } from '../../types/products';
import { useAppSelector } from '../../app/hooks';
import { BackBreadcrumb } from '../../components/BackBreadcrumb';
import { NotFoundProduct } from './components/NotFoundProduct';
import { OverviewSectionSceleton } from './sections/OverviewSection/OverviewSectionSceleton';
import ContentLoader from 'react-content-loader';

const getSuggestedProducts = (products: Product[]): Product[] => {
  if (products.length <= 10) {
    return [...products];
  }

  const randomProducts: Product[] = [];
  const usedIndices = new Set<number>();

  while (randomProducts.length < 10 && usedIndices.size < products.length) {
    const randomIndex = Math.floor(Math.random() * products.length);

    if (!usedIndices.has(randomIndex)) {
      randomProducts.push(products[randomIndex]);
      usedIndices.add(randomIndex);
    }
  }

  return randomProducts;
};

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [isLoad, setIsLoad] = useState(false);
  const [, setIsError] = useState(false);
  const [gadgets, setGadgets] = useState<ProductDetail[]>([]);
  const [similarGadgets, setSimilarGadgets] = useState<ProductDetail[]>([]);
  const [curGadget, setCurGadgets] = useState<ProductDetail | null>(null);
  const location = useLocation();
  const category = location.pathname.split('/').filter(el => el)[0];
  const products = useAppSelector(state => state.store.products);
  const suggestedProducts = getSuggestedProducts(products);

  useEffect(() => {
    setIsLoad(true);
    switch (category) {
      case TypeProduct.phones:
        getPhones()
          .then(res => {
            setGadgets(res);
            setIsError(false);
          })
          .catch(() => {
            setIsError(true);
          })
          .finally(() => {
            setIsLoad(false);
          });
        break;
      case TypeProduct.accessories:
        getAccessories()
          .then(res => {
            setGadgets(res);
            setIsError(false);
          })
          .catch(() => {
            setIsError(false);
          })
          .finally(() => {
            setIsLoad(false);
          });
        break;
      case TypeProduct.tablets:
        getTablets()
          .then(res => {
            setGadgets(res);
            setIsError(false);
          })
          .catch(() => {
            setIsError(true);
          })
          .finally(() => {
            setIsLoad(false);
          });
        break;
      default:
        setIsError(true);
        break;
    }
  }, [category]);

  useEffect(() => {
    if (gadgets.length !== 0) {
      const curProduct =
        gadgets.find(gadget => gadget.id === productId) || null;
      const similar = gadgets.filter(
        gadget => gadget.namespaceId === curProduct?.namespaceId,
      );

      setSimilarGadgets(similar);
      setCurGadgets(curProduct);
    }
  }, [productId, gadgets, category]);

  return (
    <main className={styles.ProductDetails}>
      <Breadcrumbs />

      <BackBreadcrumb />

      {isLoad && (
        <>
          <ContentLoader
            speed={2}
            backgroundColor="#161827"
            foregroundColor="#263050"
            className={styles.skeleton__title}
          >
            <rect x="0" y="0" width="250px" height="31px" />
          </ContentLoader>
          <OverviewSectionSceleton />
        </>
      )}
      {!curGadget && !isLoad && <NotFoundProduct />}
      {curGadget && (
        <>
          <h2 className={styles.ProductDetails__title}>{curGadget?.name}</h2>

          <div
            className={classNames(
              styles.ProductDetails__content,
              'main__content',
            )}
          >
            <OverviewSection
              curProduct={curGadget}
              similarProducts={similarGadgets}
            />

            <AboutSection curProduct={curGadget} />

            <TechSpecsSection curProduct={curGadget} />

            <div className={styles.ProductDetails__suggested}>
              <h3>You may also like</h3>
              <ProductsSlider products={suggestedProducts} />
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default ProductDetailsPage;
