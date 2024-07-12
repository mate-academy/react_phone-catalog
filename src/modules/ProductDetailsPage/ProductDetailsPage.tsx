/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';

import { GlobalContext } from '../../GlobalContext';

import {
  getDetailsList,
  getHotPriceProducts,
  getProductDetails,
} from '../../shared/httpClient';
import { ProductDetails } from '../../types/ProductDetails';

import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Loader } from '../../components/Loader';
import { NoResults } from '../../components/NoResults';
import { Imgs } from './components/Imgs';
import { Characteristics } from './components/Characteristics';
import { About } from './components/About';
import { TechSpecs } from './components/TechSpecs';
import { PrevPageButton } from './components/PrevPageButton';

import classes from './ProductDetailsPage.module.scss';
import { ProductsSlider } from '../../components/ProductsSlider';

export const ProductDetailsPage = () => {
  const { pathname } = useLocation();
  const { itemId } = useParams();
  const { dispatch, isLoading, products } = useContext(GlobalContext);

  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [productList, setProductList] = useState<ProductDetails[]>([]);
  const [isError, setIsError] = useState(false);

  const params = pathname.toString().slice(1).split('/');
  const recommended = products.filter(item => item.category === params[0]);

  useEffect(() => {
    if (itemId !== params[1]) {
      return;
    }

    dispatch({ type: 'START_LOADER' });

    getProductDetails(params[0], params[1])
      .then(item => {
        if (!item) {
          setProduct(null);
        } else {
          setProduct(item);
          getDetailsList(params[0], item.namespaceId).then(setProductList);
        }
      })
      .catch(() => setIsError(true))
      .finally(() => dispatch({ type: 'STOP_LOADER' }));
  }, [dispatch, itemId]);

  if (!itemId) {
    return <Navigate to=".." />;
  }

  return (
    <div className={classes.ProductDetailsPage}>
      <Breadcrumbs />

      <div className={classes.ProductDetailsPage__back}>
        <PrevPageButton />
      </div>

      <div className={classes.ProductDetailsPage__content}>
        {isLoading && !isError && <Loader />}

        {isError && <NoResults title={`${product?.name} not found`} />}

        {!isLoading && !isError && !product && (
          <NoResults title="Product was not found" />
        )}

        {!isLoading && !isError && product && (
          <div className={classes.ProductDetailsPage__main}>
            <h2 className={classes.ProductDetailsPage__title}>
              {product.name}
            </h2>

            <div className={classes.ProductDetailsPage__container}>
              <Imgs name={product.name} imgs={product.images} />
              <Characteristics
                product={product}
                list={productList}
                changeItem={setProduct}
              />
              <About description={product.description} />
              <TechSpecs product={product} />
            </div>
            <ProductsSlider
              title="You may also like"
              items={getHotPriceProducts(recommended)}
            />
          </div>
        )}
      </div>
    </div>
  );
};
