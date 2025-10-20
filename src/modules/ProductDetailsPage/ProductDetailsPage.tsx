import { useLocation, useParams } from 'react-router-dom';
import styles from './ProductDetailsPage.module.scss';
import { useTabs } from '../../ProductsContext/TabsContext';
import { ProductsStyleMode } from '../shared/types/types';
import { ProductsList } from '../HomePage/components/ProductsList';
import { ProductProvider } from './hooks/ProductContext';
import { ProductName } from './components/ProductName/ProductName';
import { NavigateButtons } from './components/NavigateButtons';
import { AboutAndTechSpecs } from './components/AboutAndTechSpecs';
import { SwitchPhotos } from './components/SwitchPhotos';
import { ImgSliders } from './components/ImgSliders';
import { InformContainer } from './components/InformContainer';

export const ProductDetailsPage = () => {
  const { id } = useParams();
  const { productsList, loading, error } = useTabs();
  const location = useLocation();

  const product = productsList.find(e => e.id === Number(id));

  const isProductPage =
    location.pathname === `/${product?.category}/product/${product?.id}`;

  const sale = product?.price !== product?.fullPrice;

  if (loading) {
    return <div className={styles.status}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.status}>error...</div>;
  }

  if (!product) {
    return <div className={styles.status}>Product not found...</div>;
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
