import React, { useEffect, useState } from 'react';
import './ProductDetails.scss';
import { useLocation, useParams } from 'react-router-dom';
import { FullProductData } from '../../types/FullProductData';
import ProductSlider from '../../components/ProductSlider/ProductSlider';
import { useAppContext } from '../../context/context';
import { getHotProducts } from '../../utils/utils';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { BackLinkButton } from '../../components/Elements/BackLinkButton';
import { getProduct } from '../../services/api';
import { Category } from '../../types/Category';
import { ProductInfo } from '../../components/ProductInfo';
import { Product } from '../../types/Product';

export const ProductDetails: React.FC = () => {
  const { productId = '' } = useParams();
  const [product, setProduct] = useState<FullProductData | null>(null);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const { pathname } = useLocation();
  const currentCategory = pathname.split('/')[1];

  const { products } = useAppContext();
  const selectedProduct = products.find(
    item => String(item.id) === product?.id,
  );

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const category = () => {
      switch (currentCategory) {
        case 'phones':
          return Category.Phones;
        case 'tablets':
          return Category.Tablets;
        case 'accessories':
          return Category.Accessories;
        default:
          return Category.Phones;
      }
    };

    getProduct(category(), productId).then(res => {
      if (res) {
        setProduct(res);
      }
    });
  });

  let itemWidth = 212;
  let frameSize = 2;
  const gap = 16;
  let step = 2;

  if (screenWidth >= 640 && screenWidth < 1200) {
    itemWidth = 237;
    frameSize = 3;
    step = 3;
  } else if (screenWidth >= 1200) {
    itemWidth = 272;
    frameSize = 4;
    step = 4;
  }

  const sliderSettings = {
    itemWidth,
    frameSize,
    gap,
    step,
  };

  return (
    <>
      {product && (
        <div className="DetailsPage">
          <Breadcrumbs />
          <BackLinkButton />

          <ProductInfo
            product={selectedProduct as Product}
            productInfo={product}
          />

          <ProductSlider
            title={'You may also like'}
            elements={getHotProducts(products)}
            settings={sliderSettings}
          />
        </div>
      )}
    </>
  );
};
