import { PathNavigation } from '../../../shared/components/PathNavigation';
import styles from './ProductDetailsPage.module.scss';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDataLoader } from '../../../shared/hooks/useDataLoader';
import { Product } from '../../../shared/types/types';
import { Category, LoadingStatus } from '../../../shared/types/enums';
// eslint-disable-next-line max-len
import { useLanguage } from '../../../shared/components/Contexts/LanguageContext';
import {
  accessoriesPath,
  phonesPath,
  tabletsPath,
} from '../../../shared/consts/paths';
import { ProductsSlider } from '../../../shared/components/ProductsSlider';
import { ProductDetailedInfo } from '../ProductDetailedInfo';
// eslint-disable-next-line max-len
import { ProductsSliderSkeleton } from '../../../shared/components/ProductsSliderSkeleton';
import { ProductDetailedInfoSkeleton } from '../ProductDetailedInfoSkeleton';
import { ProductNotFound } from '../ProductNotFound';
import { productsFile } from '../../../shared/consts/apiFiles';
import {
  accessoriesFile,
  phonesFile,
  tablestFile,
} from '../../consts/apiFiles';
import { ProductDetails } from '../../types';

type Props = {
  productCategory: Category;
};

export const ProductDetailsPage: React.FC<Props> = ({ productCategory }) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const productsLoader = useDataLoader<Product>(productsFile);
  const [
    products,
    productsLoadingStatus,
    productsResponseStatus,
    productsReload,
  ] = productsLoader;

  const getSuggestedProducts = useCallback((): Product[] => {
    const drawnIndexes: number[] = [];

    for (let i = 0; i < 20 && i < products.length; i++) {
      let findNewIndex: boolean;

      do {
        const drawnIndex = Math.floor(Math.random() * products.length);

        findNewIndex = false;

        if (drawnIndexes.includes(drawnIndex)) {
          findNewIndex = true;
        } else {
          drawnIndexes.push(drawnIndex);
        }
      } while (findNewIndex);
    }

    return drawnIndexes.map(drawnIndex => products[drawnIndex]);
  }, [products]);

  const product = useMemo(
    () => products.find(productToFind => productToFind.itemId === productId),
    [productId, products],
  );

  let file;

  switch (product?.category) {
    case Category.Phones:
      file = phonesFile;
      break;
    case Category.Tablets:
      file = tablestFile;
      break;
    case Category.Accessories:
      file = accessoriesFile;
      break;
    case undefined:
      break;
    default:
      throw new Error('Product category is not valid!!!');
  }

  const detailsLoader = useDataLoader<ProductDetails>(file);
  const currentLoader = product ? detailsLoader : productsLoader;
  const [details] = detailsLoader;
  const [, currentLoadingStatus, currentResponseStatus, currentReload] =
    currentLoader;

  const productDetails = useMemo(
    () => details.find(productToFind => productToFind.id === productId),
    [details, productId],
  );

  const {
    mayLike,
    phonesPath: phonesPathText,
    tabletsPath: tabletsPathText,
    accessoriesPath: accessoriesPathText,
  } = useLanguage().localeTexts;

  let prevPagePath;
  let prevPageLink;

  switch (productCategory) {
    case Category.Phones:
      prevPagePath = phonesPathText;
      prevPageLink = phonesPath;
      break;
    case Category.Tablets:
      prevPagePath = tabletsPathText;
      prevPageLink = tabletsPath;
      break;
    case Category.Accessories:
      prevPagePath = accessoriesPathText;
      prevPageLink = accessoriesPath;
      break;
    default:
      throw new Error('Product category is not valid!!!');
  }

  const path = [prevPagePath];

  if (productDetails) {
    path.push(productDetails.name);
  }

  const suggestedProducts = useMemo(getSuggestedProducts, [
    getSuggestedProducts,
    productId,
  ]);

  let content: React.JSX.Element;

  if (currentLoadingStatus === LoadingStatus.Success) {
    if (product && productDetails) {
      content = (
        <ProductDetailedInfo
          productDetails={productDetails}
          product={product}
        />
      );
    } else {
      content = <ProductNotFound />;
    }
  } else {
    content = (
      <ProductDetailedInfoSkeleton
        loadingStatus={currentLoadingStatus}
        onReloadClick={currentReload}
        responseStatus={currentResponseStatus}
      />
    );
  }

  useEffect(() => {
    if (product && product?.category !== productCategory) {
      let newPath: string;

      switch (product?.category) {
        case Category.Phones:
          newPath = phonesPath;
          break;
        case Category.Tablets:
          newPath = tabletsPath;
          break;
        case Category.Accessories:
          newPath = accessoriesPath;
          break;
        default:
          throw new Error('Product category is not valid!!!');
      }

      navigate(`../..${newPath}/${product.itemId}`);
    }
  }, [navigate, product, productCategory]);

  return (
    <>
      <PathNavigation path={path} links={[prevPageLink]} goBack />

      <main className={styles.ProductDetailsPage}>
        {content}

        {productsLoadingStatus === LoadingStatus.Success ? (
          <ProductsSlider
            title={mayLike}
            titleHeadingLevel="h2"
            products={suggestedProducts}
          />
        ) : (
          <ProductsSliderSkeleton
            title={mayLike}
            titleHeadingLevel="h2"
            loadingStatus={productsLoadingStatus}
            onReloadClick={productsReload}
            responseStatus={productsResponseStatus}
          />
        )}
      </main>
    </>
  );
};
