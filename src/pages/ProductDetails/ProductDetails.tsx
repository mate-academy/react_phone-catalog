import React, { useEffect, useState } from 'react';
import './ProductDetails.scss';
import { useLocation, useParams } from 'react-router-dom';
import { FullProductData } from '../../types/FullProductData';
// import { MainControl } from './MainControl';
import ProductSlider from '../../components/ProductSlider/ProductSlider';
import { useAppContext } from '../../context/context';
import { getHotProducts } from '../../utils/utils';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { BackLinkButton } from '../../components/Elements/BackLinkButton';
import { getProduct } from '../../services/api';
import { Category } from '../../types/Category';

export const ProductDetails: React.FC = () => {
  const { productId = '' } = useParams();
  const [product, setProduct] = useState<FullProductData | null>(null);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const { pathname } = useLocation();
  const currentCategory = pathname.split('/')[1];

  const { products } = useAppContext();

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

  if (!product) {
    return <h1 style={{ marginTop: '20px' }}>not found</h1>;
  }

  return (
    <div className="container">
      {/* {isLoading ? (
        <div className="page-skeleton">
          <div className="page-skeleton__images">
            <div className="page-skeleton__image skeleton"></div>
            <div className="page-skeleton__image-thumbnails">
              <div className="image-thumbnail skeleton"></div>
              <div className="page-skeleton__image-thumbnail skeleton"></div>
              <div className="page-skeleton__image-thumbnail skeleton"></div>
              <div className="page-skeleton__image-thumbnail skeleton"></div>
              <div className="page-skeleton__image-thumbnail skeleton"></div>
              <div className="page-skeleton__image-thumbnail skeleton"></div>
            </div>
          </div>
          <div className="page-skeleton__details">
            <div className="page-skeleton__title skeleton"></div>
            <div className="page-skeleton__colors">
              <div className="page-skeleton__color skeleton"></div>
              <div className="page-skeleton__color skeleton"></div>
              <div className="page-skeleton__color skeleton"></div>
            </div>
            <div className="page-skeleton__capacity">
              <div className="page-skeleton__capacity-option skeleton"></div>
              <div className="page-skeleton__capacity-option skeleton"></div>
            </div>
            <div className="page-skeleton__price skeleton"></div>
            <div className="page-skeleton__button skeleton"></div>
            <div className="page-skeleton__specs">
              <div className="page-skeleton__spec">
                <div className="page-skeleton__spec-title skeleton"></div>
              </div>
            </div>
          </div>
          <div className="page-skeleton__about">
            <div className="page-skeleton__about-title skeleton"></div>
            <div className="page-skeleton__about-description">
              <div
                className="page-skeleton__about-description-text 
                skeleton"
              ></div>
              <div
                className="page-skeleton__about-description-text 
              skeleton"
              ></div>
            </div>
          </div>
          <div className="page-skeleton__tech-specs">
            <div className="page-skeleton__tech-specs-title skeleton"></div>
            <div className="page-skeleton__tech-specs-table">
              <div className="page-skeleton__tech-specs-row">
                <div className="page-skeleton__tech-specs-cell skeleton"></div>
              </div>
            </div>
          </div>
          <div className="page-skeleton__related-products">
            <div
              className="page-skeleton__related-products-title 
            skeleton"
            ></div>
            <div className="page-skeleton__related-product">
              <div
                className="page-skeleton__related-product-image 
              skeleton"
              ></div>
              <div className="page-skeleton__related-product-details">
                <div
                  className="page-skeleton__related-product-title 
                skeleton"
                ></div>
                <div
                  className="page-skeleton__related-product-price 
                skeleton"
                ></div>
              </div>
            </div>
          </div>
        </div>
      ) : ( */}
      product && (
      <div className="DetailsPage">
        <Breadcrumbs />
        <BackLinkButton />

        {/* <div className="DetailsPage__top">
          <DetailsSlider
            images={product.images}
            className="DetailsPage__top--slider"
          />
          <MainControl
            product={product}
            className="DetailsPage__top--main-control"
          />
        </div> */}

        <div className="DetailsPage__bottom">
          {/* <div className="DetailsPage__about">
            <h3 className="DetailsPage__about--title">{t('About')}</h3>
            <div className="line line--mb32"></div>
            <div className="DetailsPage__about--desc--flex">
              {product &&
                product.description &&
                product.description.map(desc => (
                  <div className="DetailsPage__about--desc" key={desc.title}>
                    <h4 className="DetailsPage__about--desc--title">
                      {desc.title}
                    </h4>
                    {desc.text.map((paragraph, index) => (
                      <p
                        key={index}
                        className="DetailsPage__about--desc--text
                            body-text"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ))}
            </div>
          </div>
          <div className="DetailsPage__specs">
            <h3 className="DetailsPage__specs--title">{t('Tech specs')}</h3>
            <div className="line line--mb30"></div>
            <div className="DetailsPage__specs-block">
              {[
                { title: t('Screen'), value: product.screen },
                { title: t('Resolution'), value: product.resolution },
                { title: t('Processor'), value: product.processor },
                { title: t('RAM'), value: product.ram },
                { title: t('Built-in Memory'), value: product.capacity },
                { title: t('Camera'), value: product.camera },
                { title: t('Zoom'), value: product.zoom },
                { title: t('Cell'), value: product.cell.join(', ') },
              ].map((spec, index) => (
                <div
                  className="DetailsPage__specs-block--text-block"
                  key={index}
                >
                  <p
                    className="DetailsPage__specs-block--text-block--text 
                        body-text"
                  >
                    {spec.title}
                  </p>
                  <p
                    className="DetailsPage__specs-block--text-block--text-2 
                      body-text"
                  >
                    {spec.value}
                  </p>
                </div>
              ))}
            </div>
          </div> */}
          <div className="DetailsPage__slider">
            <ProductSlider
              title={'You may also like'}
              elements={getHotProducts(products)}
              settings={sliderSettings}
            />
          </div>
        </div>
      </div>
      ){/* )} */}
    </div>
  );
};
