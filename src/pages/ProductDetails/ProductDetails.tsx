import React, { useEffect, useState } from 'react';
import './ProductDetails.scss';
import { useLocation } from 'react-router-dom';
import { FullProductData } from '../../types/FullProductData';
import ProductSlider from '../../components/ProductSlider/ProductSlider';
import { useAppContext } from '../../context/context';
import { getHotProducts } from '../../utils/utils';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { BackLinkButton } from '../../components/Elements/BackLinkButton';
import { ProductInfo } from '../../components/ProductInfo';
import { Product } from '../../types/Product';
import useSliderSettings from '../../hooks/useSliderSettings';
import { useParams } from 'react-router-dom';
import { getProduct } from '../../services/api';
import { Category } from '../../types/Category';
// import { Category } from '../../types/Category';

export const ProductDetails: React.FC = () => {
  const { productId = '' } = useParams();
  const [product, setProduct] = useState<FullProductData | null>(null);

  const { pathname } = useLocation();
  const currentCategory = pathname.split('/')[1];

  const { products } = useAppContext();
  const selectedProduct = products.find(item => item.itemId === product?.id);

  const sliderSettings = useSliderSettings();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await getProduct(
          currentCategory as Category,
          productId,
        );

        setProduct(fetchedProduct as FullProductData);
      } catch (error) {
        // console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [currentCategory, productId]);

  return (
    <>
      {productId}
      {currentCategory}

      {product && (
        <div className="product-details">
          <Breadcrumbs />
          <BackLinkButton />

          <ProductInfo
            product={selectedProduct as Product}
            productInfo={product}
          />

          {products && (
            <ProductSlider
              title={'You may also like'}
              elements={getHotProducts(products)}
              settings={sliderSettings}
            />
          )}
        </div>
      )}
    </>
  );
};
