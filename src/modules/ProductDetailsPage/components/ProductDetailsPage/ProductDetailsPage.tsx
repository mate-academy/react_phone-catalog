import { PathNavigation } from '../../../shared/components/PathNavigation';
import styles from './ProductDetailsPage.module.scss';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useDataLoader } from '../../../shared/hooks/useDataLoader';
import {
  accessoriesFile,
  phonesFile,
  productsFile,
  tablestFile,
} from '../../../shared/consts/apiFiles';
import { Product, ProductDetails } from '../../../shared/types/types';
import { Category } from '../../../shared/types/enums';
// eslint-disable-next-line max-len
import { useLanguage } from '../../../shared/components/Contexts/LanguageContext';
import {
  accessoriesPath,
  phonesPath,
  tabletsPath,
} from '../../../shared/consts/paths';
import { PhotosSlider } from '../PhotosSlider';
import { ProductDetailsControls } from '../ProductDetailsControls';
import { About } from '../About';
import { TechSpecs } from '../TechSpecs';

type Props = {
  productCategory: Category;
};

export const ProductDetailsPage: React.FC<Props> = ({ productCategory }) => {
  const { productId } = useParams();
  const [products] = useDataLoader<Product>(productsFile);

  const product = products.find(
    productToFind => productToFind.itemId === productId,
  );

  let file = '';

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

  const [details] = useDataLoader<ProductDetails>(file);

  const productDetails = details.find(
    productToFind => productToFind.id === productId,
  );

  const {
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

  if (product) {
    path.push(product.name);
  }

  return (
    <>
      <PathNavigation path={path} links={[prevPageLink]} goBack />

      <main className={styles.ProductsPage}>
        {product && productDetails && (
          <>
            <h1 className={styles.Title}>{productDetails.name}</h1>

            <PhotosSlider
              photos={productDetails.images}
              productCategory={productCategory}
              className={styles.PhotosSlider}
            />

            <ProductDetailsControls
              product={productDetails}
              fullPrice={product.fullPrice}
              price={product.price}
              className={styles.Controls}
            />

            <About product={productDetails} className={styles.About} />
            <TechSpecs product={productDetails} className={styles.TechSpecs} />
          </>
        )}
      </main>
    </>
  );
};
