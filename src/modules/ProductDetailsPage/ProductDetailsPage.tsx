import React, { useEffect, useState } from 'react';
import styles from './ProductDetailsPage.module.scss';
import { useLocation, useParams } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { ProductDetail } from '../../types/productDetail';
import { TypeProduct } from '../../types/category';
import { getAccessories, getPhones, getTablets } from '../../api/products';
import { BackBreadcrumb } from './components/BackBreadcrumb';
import { OverviewSection } from './sections/OverviewSection';

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [, setIsLoad] = useState(false);
  const [, setIsError] = useState(false);
  const [gadgets, setGadgets] = useState<ProductDetail[]>([]);
  const [similarGadgets, setSimilarGadgets] = useState<ProductDetail[]>([]);
  const [curGadget, setCurGadgets] = useState<ProductDetail | null>(null);
  const location = useLocation();
  const category = location.pathname.split('/').filter(el => el)[0];

  useEffect(() => {
    if (gadgets.length === 0) {
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
    }
  }, [category, gadgets]);

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
  }, [productId, gadgets]);

  if (!curGadget) {
    return <p>error</p>;
  }

  return (
    <main className={styles.ProductDetails}>
      <Breadcrumbs />

      <BackBreadcrumb />

      <h2 className={styles.ProductDetails__title}>{curGadget?.name}</h2>

      <OverviewSection
        curProduct={curGadget}
        similarProducts={similarGadgets}
      />

      <div style={{ backgroundColor: curGadget?.color }}>dfdf</div>
      {curGadget && curGadget.id}
    </main>
  );
};

export default ProductDetailsPage;
