import React, { useEffect, useState } from 'react';
import './ProductDetailsPage.scss';
import { useParams } from 'react-router-dom';
import { Device } from '../../types/device';
import { PathBlock } from '../utils/Path';
import { MainControl } from './MainControl';
import { DetailsSlider } from '../Slider/DetailsSlider';
import { ByCategorySlider } from '../Slider/ByCategotySlider';
import { getAccessories, getPhones, getTablets } from '../../api/api';
import { useTranslation } from 'react-i18next';

export const ProductDetailsPage: React.FC = () => {
  const { itemId } = useParams();
  const [product, setProduct] = useState<Device | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isProductFound, setIsProductFound] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);

        const [phones, tablets, accessories] = await Promise.all([
          getPhones(),
          getTablets(),
          getAccessories(),
        ]);

        const findProductById = (products: Device[], id: string) => {
          return products.find(prod => prod.id === id);
        };

        if (itemId) {
          const phone = findProductById(phones, itemId);
          const tablet = findProductById(tablets, itemId);
          const accessory = findProductById(accessories, itemId);

          const foundProduct = phone || tablet || accessory;

          if (!!foundProduct) {
            setProduct(foundProduct);
          }

          setIsProductFound(!!foundProduct);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (itemId) {
      fetchProduct();
    } else {
      setIsProductFound(false);
      setProduct(null);
    }
  }, [itemId]);

  useEffect(() => {
    document.title = product?.name || 'Product details';
  }, [product]);

  if (!isProductFound) {
    return <h1 style={{ marginTop: '20px' }}>{t('not found')}</h1>;
  }

  return (
    <div className="container">
      {isLoading ? (
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
      ) : (
        product && (
          <div className="DetailsPage">
            <PathBlock category={product.category} name={product.name} />

            <div className="DetailsPage__top">
              <DetailsSlider
                images={product.images}
                className="DetailsPage__top--slider"
              />
              <MainControl
                product={product}
                className="DetailsPage__top--main-control"
              />
            </div>

            <div className="DetailsPage__bottom">
              <div className="DetailsPage__about">
                <h3 className="DetailsPage__about--title">{t('About')}</h3>
                <div className="line line--mb32"></div>
                <div className="DetailsPage__about--desc--flex">
                  {product &&
                    product.description &&
                    product.description.map(desc => (
                      <div
                        className="DetailsPage__about--desc"
                        key={desc.title}
                      >
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
              </div>
              <div className="DetailsPage__slider">
                <ByCategorySlider category={product.category} />
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};
