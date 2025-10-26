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

  useEffect(() => {
    const timer = setTimeout(() => setLocalLoading(false), 500);

    return () => clearTimeout(timer);
  }, [id]);

  const product = productsList.find(e => e.id === Number(id));

  const isProductPage =
    location.pathname === `/${product?.category}/product/${product?.id}`;

  const sale = product?.price !== product?.fullPrice;

  if (localLoading) {
    return <Loader />;
  }

  if (!product) {
    return <ProductNotFound />;
  }

  return (
    <ProductProvider
      product={product}
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
