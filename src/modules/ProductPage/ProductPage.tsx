import { Navigate, useLocation, useParams } from 'react-router-dom';
import { useContext, useMemo } from 'react';

import { ProductListContext } from '../../ContextProvider';

import { SliderTitle } from '../../types/SliderTitle';

import { ProductPageSlider } from './components/ProductPageSlider';
import { getSuggestedProducts } from '../../utils/getSuggestedProducts';
import { SuggestionsSlider } from '../../components/SuggestionsSlider';
import { BackBtn } from '../../components/BackBtn';
import { ProductConfig } from './components/ProductConfig';
import { AboutProduct } from './components/AboutProduct';
import { ProductTechSpec } from './components/ProductTechSpec';

import styles from './ProductPage.module.scss';
import { getPrevPath } from '../../utils/getPrevPath';

export const ProductPage = () => {
  const { state, pathname } = useLocation();
  const { productId: id = '' } = useParams();
  const { productList } = useContext(ProductListContext);

  const suggestedProducts = useMemo(getSuggestedProducts, [pathname]);

  const prevPath = getPrevPath(pathname);

  const { search, pathname: path } = state ?? { search: '', pathname: '' };

  const product = productList.find(item => item.id === id);

  if (!product) {
    return <Navigate to=".." />;
  }

  const { name, images, description } = product;

  return (
    <>
      <section className={styles.container}>
        <BackBtn path={path} prevPath={prevPath} search={search} />
        <h2 className={styles.productTitle}>{name}</h2>
        <ProductPageSlider productName={name} images={images} />
        <ProductConfig
          id={id}
          product={product}
          productList={productList}
          search={search}
          prevPath={prevPath}
        />

        <AboutProduct description={description} />
        <ProductTechSpec product={product} />
      </section>
      <SuggestionsSlider
        productList={suggestedProducts}
        title={SliderTitle.suggestions}
      />
    </>
  );
};
