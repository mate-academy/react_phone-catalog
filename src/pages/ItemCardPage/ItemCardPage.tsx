import * as productService from '../../api/product';
import * as phonesService from '../../api/phones';
import * as tabletsService from '../../api/tablet';
import * as accessoriesService from '../../api/accessory';
import itemCardPageStyles from './ItemCardPage.module.scss';

import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Accessory,
  Phone,
  Product,
  ProductType,
  Tablet,
} from '../../shared/types';
// eslint-disable-next-line max-len
import { SomethingWentWrongError } from '../../components/SomethingWentWrongError';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { IconArrow } from '../../shared/IconArrow';
import classNames from 'classnames';
import { ItemCardShortInfo } from '../../components/ItemCardShortInfo';
import { ProductsSlider } from '../../components/ProductSlider';
import { ItemCardPageSkeleton } from '../../components/ItemCardPageSkeleton';

type ProductDetails = Phone | Tablet | Accessory;

type Props = {
  category: ProductType;
};

const productDetailsLoaders = {
  phones: phonesService.getPhoneById,
  tablets: tabletsService.getTabletById,
  accessories: accessoriesService.getAccessoryById,
};

const getBreadCrumbsPath = (category: string, productName: string) => {
  return [
    {
      title: category[0].toUpperCase() + category.slice(1),
      to: `/${category}`,
    },
    {
      title: productName,
    },
  ];
};

const TechSpecsToFields = {
  Screen: 'screen',
  Resolution: 'resolution',
  Processor: 'processor',
  RAM: 'ram',
  'Built in memory': 'capacity',
  Camera: 'camera',
  Zoom: 'zoom',
  Cell: 'cell',
};

export const ItemCardPage = ({ category }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [products, setProducts] = useState<Product[]>([]);

  const { productId = '' } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const pageTopRef = useRef<HTMLDivElement | null>(null);

  const [productDetails, setProductDetails] = useState<ProductDetails | null>(
    null,
  );

  const shouldScrollToTop =
    typeof location.state === 'object' &&
    location.state !== null &&
    'scrollToTop' in location.state;

  useEffect(() => {
    if (!shouldScrollToTop || isLoading || !productDetails) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      pageTopRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [shouldScrollToTop, isLoading, productDetails]);

  const loadProduct = useCallback(() => {
    setIsLoading(true);
    setErrorMessage('');
    setProducts([]);
    setProductDetails(null);

    if (!productId) {
      setErrorMessage('Product was not found');
      setIsLoading(false);

      return;
    }

    Promise.all([
      productService.getProductsByCategory(category),
      productDetailsLoaders[category](productId),
    ])
      .then(([foundProducts, foundProductDetails]) => {
        if (!foundProducts || !foundProductDetails) {
          setErrorMessage('Product was not found');

          return;
        }

        setProducts(foundProducts);
        setProductDetails(foundProductDetails);
      })
      .catch(() => {
        setErrorMessage('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [category, productId]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  const handleGoBack = () => {
    navigate(`/${category}`);
  };

  const product = products.find(prod => prod.itemId === productId);

  return (
    <>
      {errorMessage && (
        <SomethingWentWrongError
          errorMessage={errorMessage}
          actionText="Go back"
          onAction={handleGoBack}
        />
      )}

      {!errorMessage && isLoading && <ItemCardPageSkeleton />}

      {!errorMessage && !isLoading && productDetails && product && (
        <>
          <div
            ref={pageTopRef}
            className={classNames('container', itemCardPageStyles.ItemCardPage)}
          >
            <Breadcrumbs
              items={getBreadCrumbsPath(category, productDetails.name)}
            />
            <button
              onClick={handleGoBack}
              className={classNames(
                'font-small',
                itemCardPageStyles.BackButton,
              )}
            >
              <IconArrow direction="Left" />
              <span className={itemCardPageStyles.BackButtonText}>Back</span>
            </button>

            <ItemCardShortInfo
              productDetails={productDetails}
              product={product}
            />

            <div className={itemCardPageStyles.ContentContainer}>
              <article>
                <h3
                  className={classNames(
                    'font-h3',
                    itemCardPageStyles.AboutTitle,
                  )}
                >
                  About
                </h3>
                <div className={itemCardPageStyles.AboutContent}>
                  {productDetails.description.map(({ title, text }, index) => {
                    return (
                      <>
                        <h4
                          className={classNames(
                            'font-h4',
                            itemCardPageStyles.AboutSubtitle,
                          )}
                          key={index}
                        >
                          {title}
                        </h4>
                        <div className={itemCardPageStyles.AboutText}>
                          {text.map((paragraph, textIndex) => (
                            <p className={'font-body'} key={textIndex}>
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </>
                    );
                  })}
                </div>
              </article>
              <article className={itemCardPageStyles.TechSpecs}>
                <h3
                  className={classNames(
                    'font-h3',
                    itemCardPageStyles.TechSpecsTitle,
                  )}
                >
                  Tech specs
                </h3>
                <div>
                  {Object.entries(TechSpecsToFields).map(([key, value]) => {
                    const fieldValue =
                      productDetails[value as keyof ProductDetails];

                    if (!fieldValue) {
                      return null;
                    }

                    return (
                      <p
                        key={key}
                        className={classNames(
                          'font-body',
                          itemCardPageStyles.TechSpecData,
                        )}
                      >
                        <span className={itemCardPageStyles.TechSpecSubtitle}>
                          {key}
                        </span>
                        <span className={itemCardPageStyles.TechSpecInfo}>
                          {Array.isArray(fieldValue)
                            ? fieldValue.join(', ')
                            : fieldValue}
                        </span>
                      </p>
                    );
                  })}
                </div>
              </article>
            </div>
          </div>
          <div className={itemCardPageStyles.SliderContainer}>
            <ProductsSlider
              products={products}
              title={'You may also like'}
              isLoading={isLoading}
            />
          </div>
        </>
      )}
    </>
  );
};
