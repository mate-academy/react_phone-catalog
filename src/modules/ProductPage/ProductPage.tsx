import { useLocation, useParams } from 'react-router-dom';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';

import { ProductListContext } from '../../ContextProvider';

import { getSuggestedProducts } from '../../utils/getSuggestedProducts';
import { SuggestionsSlider } from '../../components/SuggestionsSlider';

import { getPrevPath } from '../../utils/getPrevPath';
import { ProductNotFound } from './components/ProductNotFound';
import { Product } from '../../types/Product';
import { ProductType } from '../../types/ProductType';
import { useTranslation } from 'react-i18next';
import { getAllProducts } from '../../utils/getAllProducts';
// eslint-disable-next-line max-len
import { SkeletonProductPage } from '../../components/Skeletons/SkeletonProductPage';
import { SkeletonSlider } from '../../components/Skeletons/SkeletonSlider';
import { ProductStructure } from './components/ProductStructure';

export const ProductPage = () => {
  const { t } = useTranslation('common');
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState('');

  const { state, pathname } = useLocation();
  const { productId: id = '' } = useParams();
  const { productList, setProductList } = useContext(ProductListContext);

  const prevPath = getPrevPath(pathname);

  const { search, pathname: path } = state ?? { search: '', pathname: '' };

  const product = productList.find(item => item.id === id);
  const fetchedCategories = Array.from(
    new Set(productList.map(({ category }) => category)),
  );

  const shouldFetchProducts =
    fetchedCategories.length !== Object.keys(ProductType).length;

  useLayoutEffect(() => {
    if (!shouldFetchProducts) {
      setSuggestedProducts(getSuggestedProducts(productList));
    }
  }, [id]);

  useEffect(() => {
    const controller = new AbortController();
    let timeoutID: ReturnType<typeof setTimeout>;

    if (shouldFetchProducts) {
      setIsLoading(true);
      timeoutID = setTimeout(() => {
        getAllProducts(
          fetchedCategories as ProductType[],
          controller.signal,
          productList,
        )
          .then(aggregatedProducts => {
            setProductList(aggregatedProducts);

            setSuggestedProducts(
              getSuggestedProducts(
                aggregatedProducts.filter(({ id: itemID }) => itemID !== id),
              ),
            );
          })
          .finally(() => setIsLoading(false));
        // .catch(e => setError(e))
      }, 1500);
    }

    return () => {
      clearTimeout(timeoutID);
      controller.abort();
      setIsLoading(false);
    };
  }, []);

  if (product && shouldFetchProducts && isLoading) {
    return (
      <>
        <ProductStructure
          productList={productList}
          path={path}
          prevPath={prevPath}
          search={search}
          id={id}
          product={product}
        />
        <SkeletonSlider sliderTitle={t('suggestionSliderTitle')} />
      </>
    );
  }

  if (isLoading || (shouldFetchProducts && !product)) {
    return (
      <>
        <SkeletonProductPage />
        <SkeletonSlider sliderTitle={t('suggestionSliderTitle')} />
      </>
    );
  }

  if (!product) {
    return <ProductNotFound path={path} prevPath={prevPath} search={search} />;
  }

  return (
    <>
      <ProductStructure
        productList={productList}
        path={path}
        prevPath={prevPath}
        search={search}
        id={id}
        product={product}
      />
      <SuggestionsSlider
        productList={suggestedProducts}
        title={t('suggestionSliderTitle')}
      />
    </>
  );
};
