import { useLocation, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import { ProductListContext } from '../../ContextProvider';

import { ProductPageSlider } from './components/ProductPageSlider';
import { getSuggestedProducts } from '../../utils/getSuggestedProducts';
import { SuggestionsSlider } from '../../components/SuggestionsSlider';
import { BackBtn } from '../../components/BackBtn';
import { ProductConfig } from './components/ProductConfig';
import { AboutProduct } from './components/AboutProduct';
import { ProductTechSpec } from './components/ProductTechSpec';

import styles from './ProductPage.module.scss';
import { getPrevPath } from '../../utils/getPrevPath';
import { ProductNotFound } from './components/ProductNotFound';
import { Product } from '../../types/Product';
import { ProductType } from '../../types/ProductType';
import { getProducts } from '../../utils/getProducts';
import { FetchDataType } from '../../types/FetchDataType';
import { useTranslation } from 'react-i18next';

export const ProductPage = () => {
  const { t } = useTranslation('common');
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  // const [error, setError] = useState('');

  const { state, pathname } = useLocation();
  const { productId: id = '' } = useParams();
  const { productList } = useContext(ProductListContext);

  const prevPath = getPrevPath(pathname);

  const { search, pathname: path } = state ?? { search: '', pathname: '' };

  const product = productList.find(item => item.id === id);

  useEffect(() => {
    if (product) {
      const fetchCategories = Object.keys(ProductType).filter(
        category => category !== product?.category,
      ) as FetchDataType[];

      Promise.all(fetchCategories.map(category => getProducts(category))).then(
        ([productList1, productList2]) =>
          setSuggestedProducts(
            getSuggestedProducts(productList, productList1, productList2),
          ),
      );
      // .catch(e => setError(e))
    }
  }, [product?.namespaceId]);

  if (!product) {
    return <ProductNotFound path={path} prevPath={prevPath} search={search} />;
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
        title={t('suggestionSliderTitle')}
      />
    </>
  );
};
