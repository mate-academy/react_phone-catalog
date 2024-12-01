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

export const HomePage = () => {
  const { t } = useTranslation('homepage');
  const { productList, setProductList } = useContext(ProductListContext);
  const { aggregatedProductList, setAggregatedProductList } = useContext(
    AggregatedProductListContext,
  );
  const [phonesList, setPhonesList] = useState<Product[]>([]);
  const [isLoadingAllProducts, setIsLoadingAllProducts] = useState(false);
  const [isLoadingAggregatedList, setIsLoadingAggregatedList] = useState(false);
  // const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchedCategories = Array.from(
      new Set(productList.map(({ category }) => category)),
    );

    if (productList.some(({ category }) => category === ProductType.phones)) {
      setPhonesList(
        productList.filter(({ category }) => category === ProductType.phones),
      );
    }

    if (fetchedCategories.length !== Object.keys(ProductType).length) {
      const fetchCategories = Object.keys(ProductType).filter(
        category => !fetchedCategories.includes(category),
      ) as FetchDataType[];

      setIsLoadingAllProducts(true);
      setTimeout(() => {
        Promise.all(
          fetchCategories.map(category =>
            getProducts(category, controller.signal),
          ),
        )
          .then(results => {
            const allProducts = [...productList];

            results.forEach((result: Product[]) => allProducts.push(...result));

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
      setTimeout(() => {
        getProducts(FetchDataType.products, controller.signal)
          .then(setAggregatedProductList)
          // .catch(() => setError(true))
          .finally(() => setIsLoadingAggregatedList(false));
      }, 5000);
    }

    // if (productList.some(({ category }) => category === ProductType.phones)) {
    //   setIsLoadingAllProduct(true);
    //   setTimeout(() => {
    //     getProducts(FetchDataType.products, controller.signal)
    //       .then(setAllProductList)
    //       .catch(() => setError(true))
    //       .finally(() => setIsLoadingAllProduct(false));
    //   }, 5000);
    //   setPhonesList(
    //     productList.filter(({ category }) => category === ProductType.phones),
    //   );
    // } else {
    //   setTimeout(() => {
    //     setIsLoadingPhones(true);
    //     setIsLoadingAllProduct(true);
    //
    //     Promise.allSettled([
    //       getProducts(FetchDataType.phones, controller.signal),
    //       getProducts(FetchDataType.products, controller.signal),
    //     ])
    //       .then(results => {
    //         results.forEach((result, index) => {
    //           if (result.status === 'fulfilled') {
    //             if (!index) {
    //               setPhonesList(result.value);
    //               setProductList(result.value);
    //             } else {
    //               setAllProductList(result.value);
    //             }
    //           } else if (result.status === 'rejected') {
    //             setError(true);
    //           }
    //         });
    //       })
    //       .finally(() => {
    //         setIsLoadingPhones(false);
    //         setIsLoadingAllProduct(false);
    //       });
    //   }, 5000);
    // }

    // getProducts(FetchDataType.phones).then(res => setProducts(res));
    // .catch(e => setError(e));

    // getProducts(FetchDataType.products).then(res => setProductList(res));
    // .catch(e => setError(e));
    // .finally(() => setLoading(false))
    return () => controller.abort();
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
