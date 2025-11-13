import React, { useContext, useEffect } from 'react';
import './ProductItem.scss';
import { useParams } from 'react-router-dom';
import { Breadcrumbs } from '../../../../shared/components/Breadcrumbs';
import { SectionTitle } from '../../../../shared/components/SectionTitle/SectionTitle';
import { Loader } from '../../../../shared/components/Loader';
import phonesData from '../../../../../../public/api/phones.json';
import tabletsData from '../../../../../../public/api/tablets.json';
import accessoriesData from '../../../../../../public/api/accessories.json';
import type { ProductDetails } from '../../../../shared/types/ProductDetails';
import { ProductImage } from '../ProductImage';
import { ProductProperties } from '../ProductProperties';
import { ProductListContext } from '../../../../shared/context/ProductListContext';
import { ProductAbout } from '../ProductAbout';
import { ProductTechSpecs } from '../ProductTechSpecs';
import { ProductSlider } from '../../../../shared/components/ProductSlider';
import { SliderProvider } from '../../../../shared/context/SliderContext';
import { BackButton } from '../../../../shared/components/BackButton';
import {
  SelectedProductState,
  SelectedProductDispatch,
} from '../../../../shared/reduce/SelectedProductReducer';
import productsNotFounded from '../../../../../global-assets/images/product-not-found.png';
import { ImageNotif } from '../../../../shared/components/ImageNotif';
import { TranslationContext } from '../../../../../i18next/shared';
import { wait } from '../../../../shared/servises/handleWait';

export const ProductItem: React.FC = () => {
  const { notifMessage, sliderTitle } = useContext(TranslationContext);
  const { productList } = useContext(ProductListContext);
  const selectedState = useContext(SelectedProductState);
  const selectedDispatch = useContext(SelectedProductDispatch);

  const { category, productId } = useParams();
  const pathBack = `/${category?.toLowerCase()}`;

  useEffect(() => {
    let products: ProductDetails[] = [];

    switch (category) {
      case 'phones':
        products = phonesData;
        break;
      case 'tablets':
        products = tabletsData;
        break;
      case 'accessories':
        products = accessoriesData;
        break;
      default:
        products = [];
    }

    selectedDispatch({ type: 'setProduct', payload: null });
    selectedDispatch({ type: 'loader', payload: true });

    wait(2000)
      .then(() => {
        const product = products.filter(product => product.id === productId)[0];

        if (!product) {
          selectedDispatch({
            type: 'alarm',
            payload: notifMessage.alarmTitle,
          });
        } else {
          selectedDispatch({ type: 'setProduct', payload: product });
        }
      })
      .catch(() => {
        selectedDispatch({ type: 'error', payload: notifMessage.errorTitle });
      })
      .finally(() => {
        selectedDispatch({ type: 'loader', payload: false });
      });
  }, [productId, category]);

  const { product, error, alarm } = selectedState;

  const productProperties = [
    { name: 'screen', value: product?.screen || null },
    { name: 'resolution', value: product?.resolution || null },
    { name: 'processor', value: product?.processor || null },
    { name: 'ram', value: product?.ram || null },
    { name: 'capacity', value: product?.capacity || null },
    { name: 'camera', value: product?.camera || null },
    { name: 'zoom', value: product?.zoom || null },
    { name: 'cell', value: product?.cell || null },
  ];

  const getSuggestedProducts = () => {
    const relativeId: number[] = [];

    for (let n = 1; n < 5; n++) {
      relativeId.push(Math.floor(Math.random() * productList.length));
    }

    const relativeProducts = productList.filter(product =>
      relativeId.includes(product.id),
    );

    return relativeProducts;
  };

  return (
    <>
      {!product ? (
        <Loader />
      ) : (
        <>
          {error ? (
            <ImageNotif
              message={error}
              image={{
                src: productsNotFounded,
                alt: notifMessage.errorNotifTitle,
              }}
            />
          ) : alarm ? (
            <ImageNotif
              message={error}
              image={{
                src: productsNotFounded,
                alt: notifMessage.alarmTitle,
              }}
            />
          ) : (
            <>
              <div className="productItem">
                <div className="productItem__content-wrapper">
                  <header className="productItem__header">
                    <Breadcrumbs />
                    <BackButton path={pathBack} productId={product.id} />
                    <SectionTitle text={product.name} />
                  </header>
                  <div className="productItem__content">
                    <div className="productItem__body">
                      <ProductImage selectedProduct={product} />

                      <div className="productItem__details">
                        <span className="productItem__idName">{`ID:${product.namespaceId}`}</span>
                        <ProductProperties product={product} />
                      </div>
                    </div>
                    <div className="productItem__info">
                      <ProductAbout productDescription={product.description} />
                      <ProductTechSpecs properties={productProperties} />
                    </div>
                  </div>
                </div>
              </div>

              <SliderProvider>
                <ProductSlider
                  content={{
                    title: sliderTitle.productDetailsSlider,
                    data: getSuggestedProducts(),
                  }}
                />
              </SliderProvider>
            </>
          )}
        </>
      )}
    </>
  );
};
