import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductDetails, API_PRODUCT_URL } from '../../helpers/helper';
import { ProductsSlider } from '../ProductSlider/ProductSlider';
import { PageIndicator } from '../PageIndicator/PageIndicator';
import { ProductInfoDetails } from './ProductInfoDetails/ProductInfoDetails';
import { Loader } from '../Loader/Loader';
import { BackToPage } from '../BackToPage/BackToPage';
import './ProductDetailsPage.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TechSpecs } from './TechSpecs/TechSpecs';
import { AboutProduct } from './AboutProduct/AboutProduct';
import {
  setCapacity,
  setProduct,
  setColor,
} from '../../features/productInfoSlice';

export const ProductDetailsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector(state => state.products);
  const { productInfo } = useAppSelector(state => state.productInfo);
  const [isLoading, setIsLoading] = useState(true);
  const { productId } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await getProductDetails(`${API_PRODUCT_URL}products/${productId}.json`);

        dispatch(setProduct(response));
        dispatch(setColor(response.color));
        dispatch(setCapacity(response.capacity));
      } catch (fetchError) {
        throw new Error('Data could not be fetched');
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [productId]);

  if (!productInfo) {
    if (isLoading) {
      return <Loader />;
    }

    return (
      <div>somewthing went wrong</div>
    );
  }

  return (
    <main className="product-info">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="product-info__container">
          <PageIndicator
            productName={productInfo.name}
            productType="Phones"
          />
          <BackToPage />
          <div className="product-info__title">{productInfo.name}</div>
          <ProductInfoDetails />
          <section
            data-cy="productDescription"
            className="product-info__about about-product"
          >
            <div className="about-product__row">
              <AboutProduct description={productInfo} />
              <div className="about-product__column column-product-about">
                <div className="column-product-about__title">Tech specs</div>
                <TechSpecs
                  productInfo={productInfo}
                  specs={[
                    { key: 'screen', label: 'Screen' },
                    { key: 'resolution', label: 'Resolution' },
                    { key: 'processor', label: 'Processor' },
                    { key: 'ram', label: 'RAM' },
                    { key: 'capacity', label: 'Built in memory' },
                    { key: 'camera', label: 'Camera' },
                    { key: 'zoom', label: 'Zoom' },
                    { key: 'cell', label: 'Cell' },
                  ]}
                />
              </div>
            </div>
          </section>
          <ProductsSlider
            title="You may also like"
            products={[...products].sort(() => Math.random() - 0.5)}
          />
        </div>
      )}
    </main>
  );
};
