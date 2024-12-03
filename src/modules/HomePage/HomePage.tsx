import { Hero } from './components/Hero';
import styles from './HomePage.module.scss';
import { ShopCategory } from './components/ShopCategory';
import { SuggestionsSlider } from '../../components/SuggestionsSlider';

import { getUniqueItems } from '../../utils/getUniqueItems';
import { useContext, useEffect, useState } from 'react';
import { getProducts } from '../../utils/getProducts';
import { Product } from '../../types/Product';
import { brandNewModels } from '../../utils/brandNewModels';
import { FetchDataType } from '../../types/FetchDataType';
import { useTranslation } from 'react-i18next';
import { SkeletonSlider } from '../../components/Skeletons/SkeletonSlider';
import {
  AggregatedProductListContext,
  ProductListContext,
} from '../../ContextProvider';
import { ProductType } from '../../types/ProductType';
import { getAllProducts } from '../../utils/getAllProducts';

export const HomePage = () => {
  const { t } = useTranslation('homepage');
  const { productList, setProductList } = useContext(ProductListContext);
  const { aggregatedProductList, setAggregatedProductList } = useContext(
    AggregatedProductListContext,
  );
  const [phonesList, setPhonesList] = useState<Product[]>([]);
  const [isLoadingAllProducts, setIsLoadingAllProducts] = useState(false);
  const [isLoadingAggregatedList, setIsLoadingAggregatedList] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    if (productList.some(({ category }) => category === ProductType.phones)) {
      setPhonesList(
        productList.filter(({ category }) => category === ProductType.phones),
      );
    }

    let timeoutAllProductsID: ReturnType<typeof setTimeout>;
    let timeoutAggregatedProductsID: ReturnType<typeof setTimeout>;
    const fetchedCategories = Array.from(
      new Set(productList.map(({ category }) => category)),
    );

    if (fetchedCategories.length !== Object.keys(ProductType).length) {
      setIsLoadingAllProducts(true);
      timeoutAllProductsID = setTimeout(() => {
        getAllProducts(
          fetchedCategories as ProductType[],
          controller.signal,
          productList,
        )
          .then(allProducts => {
            setPhonesList(
              allProducts.filter(
                ({ category }) => category === ProductType.phones,
              ),
            );
            setProductList(allProducts);
          })
          .finally(() => setIsLoadingAllProducts(false));
      }, 5000);
    }

    if (!aggregatedProductList.length) {
      setIsLoadingAggregatedList(true);
      timeoutAggregatedProductsID = setTimeout(() => {
        getProducts(FetchDataType.products, controller.signal)
          .then(res => {
            setAggregatedProductList(res);
          })
          .finally(() => setIsLoadingAggregatedList(false));
      }, 5000);
    }

    return () => {
      clearTimeout(timeoutAllProductsID);
      clearTimeout(timeoutAggregatedProductsID);
      controller.abort();
    };
  }, []);

  const hotPricesPhones = getUniqueItems(phonesList)
    .filter(phone => !phone.name.includes('iPhone 14'))
    .slice(0, 7);

  const newModels = brandNewModels(
    phonesList,
    aggregatedProductList,
    'capacity',
    '256GB',
  );

  return (
    <div className={styles.hero}>
      <Hero />

      {isLoadingAggregatedList ? (
        <SkeletonSlider sliderTitle={t('titles.newModelsTitle')} />
      ) : (
        <SuggestionsSlider
          productList={newModels}
          title={t('titles.newModelsTitle')}
        />
      )}

      <ShopCategory isLoading={isLoadingAllProducts} />
      {isLoadingAllProducts ? (
        <SkeletonSlider sliderTitle={t('titles.hotPricesTitle')} />
      ) : (
        <SuggestionsSlider
          productList={hotPricesPhones}
          title={t('titles.hotPricesTitle')}
        />
      )}
    </div>
  );
};
