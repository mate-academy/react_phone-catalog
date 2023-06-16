import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductDetails, API_PRODUCT_URL } from '../../helpers/helper';
import { ProductsSlider } from '../ProductSlider/ProductSlider';
import { ProductDetails } from '../../types/ProductDetails';
import { PageIndicator } from '../PageIndicator/Phonespage/PageIndicator';
import {
  TextDescriptionTemplate,
} from '../TextDescription/TextDescriptionTemplate';
import { ProductDataContext } from '../ProductDataContext/ProductDataContext';
import { ProductInfoDetails } from '../ProductInfoDetails/ProductInfoDetails';
import { Loader } from '../Loader/Loader';
import { BackToPage } from '../BackToPage/BackToPage';
import './ProductDetailsPage.scss';
import { Product } from '../../types/Products';

type Props = {
  products: Product[],
};

export const ProductDetailsPage: React.FC<Props> = ({ products }) => {
  const [productInfo, setProductInfo] = useState<ProductDetails>();
  const [selectedCapacity, setSelectedCapacity] = useState<string>();
  const [selectedColor, setSelectedColor] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  const { productId } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await getProductDetails(`${API_PRODUCT_URL}products/${productId}.json`);

        setProductInfo(response);
        setSelectedColor(response.color);
        setSelectedCapacity(response.capacity);
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
          <ProductInfoDetails
            productInfo={productInfo}
            selectedCapacity={selectedCapacity}
            setSelectedCapacity={setSelectedCapacity}
            products={products}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
          <section
            data-cy="productDescription"
            className="product-info__about about-product"
          >
            <div className="about-product__row">
              <div className="about-product__column column-product-about">
                <div className="column-product-about__title">About</div>
                {productInfo.description.map(product => (
                  <React.Fragment key={product.title}>
                    <div className="about-product__title">{product.title}</div>
                    <div className="about-product__text">{product.text}</div>
                  </React.Fragment>
                ))}
              </div>
              <div className="about-product__column column-product-about">
                <div className="column-product-about__title">Tech specs</div>
                <TextDescriptionTemplate
                  text="Screen"
                  value={productInfo.screen}
                />
                <TextDescriptionTemplate
                  text="Resolution"
                  value={productInfo.resolution}
                />
                <TextDescriptionTemplate
                  text="Processor"
                  value={productInfo.processor}
                />
                <TextDescriptionTemplate
                  text="RAM"
                  value={productInfo.ram}
                />
                <TextDescriptionTemplate
                  text="Built in memory"
                  value={productInfo.capacity}
                />
                <TextDescriptionTemplate
                  text="Camera"
                  value={productInfo.camera}
                />
                <TextDescriptionTemplate
                  text="Zoom"
                  value={productInfo.zoom}
                />
                <TextDescriptionTemplate
                  text="Cell"
                  value={productInfo.cell.join(' ')}
                />
              </div>
            </div>
          </section>
          <ProductDataContext.Consumer>
            {(phones) => (
              <ProductsSlider
                title="You may also like"
                products={phones.sort(() => Math.random() - 0.5)}
              />
            )}
          </ProductDataContext.Consumer>
        </div>
      )}

    </main>
  );
};
