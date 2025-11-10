import { useLocation, useParams } from 'react-router-dom';
import styles from './ProductDetailsPage.module.scss';
import { useTabs } from '../../ProductsContext/TabsContext';
import { ProductsStyleMode } from '../shared/types/types';
import { ProductsList } from '../HomePage/components/ProductsList';
import { ProductProvider } from '../shared/hooks/ProductContext';
import { ProductName } from './components/ProductName/ProductName';
import { NavigateButtons } from './components/NavigateButtons';
import { AboutAndTechSpecs } from './components/AboutAndTechSpecs';
import { SwitchPhotos } from './components/SwitchPhotos';
import { ImgSliders } from './components/ImgSliders';
import { InformContainer } from './components/InformContainer';
import { Loader } from '../shared/components/Loader';
import { useEffect, useState } from 'react';
import { ProductNotFound } from '../shared/components/ProductNotFound';

export const ProductDetailsPage = () => {
  const { id } = useParams();
  const { productsList } = useTabs();
  const location = useLocation();
  const [localLoading, setLocalLoading] = useState(true);

  const [currentProduct, setCurrentProduct] = useState(
    productsList.find(p => p.id === Number(id)),
  );

  useEffect(() => {
    const timer = setTimeout(() => setLocalLoading(false), 500);

    return () => clearTimeout(timer);
  }, [id]);

  useEffect(() => {
    const found = productsList.find(p => p.id === Number(id));

    setCurrentProduct(found);
  }, [id, productsList]);

  const isProductPage =
    location.pathname ===
    `/${currentProduct?.category}/product/${currentProduct?.id}`;

  const sale = currentProduct?.price !== currentProduct?.fullPrice;

  if (localLoading) {
    return <Loader />;
  }

  if (!currentProduct) {
    return <ProductNotFound />;
  }

  return (
    <ProductProvider
      key={currentProduct.id}
      product={currentProduct}
      setCurrentProduct={setCurrentProduct}
      sale={sale}
      isProductPage={isProductPage}
    >
      <div className={styles.container}>
        <NavigateButtons />

        <ProductName />

        <div className={styles.grigContainer}>
          <SwitchPhotos />

          <ImgSliders />

          <InformContainer />
        </div>

        <AboutAndTechSpecs />

        <ProductsList productsStyle={ProductsStyleMode.Also} />
      </div>
    </ProductProvider>
  );
};
