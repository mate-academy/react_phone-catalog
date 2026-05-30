import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { CatalogContext } from '../../CatalogContext';
import { GetCurrentProduct } from '../../utils/GetCurrentProduct';
// eslint-disable-next-line
import { ProductParametrBox } from '../../components/ProductParametrBox/ProductParametrBox';
import { ImageGalery } from '../../components/ImageGalery/ImageGalery';
import { Price } from '../../components/Price/Price';
import { ProductButtons } from '../../components/ProductButtons/ProductButtons';
import { ProductInfo } from '../../components/ProductInfo/ProductInfo';
// eslint-disable-next-line
import { ProductSliderButtons } from '../../components/ProductSliderButtons/ProductSliderButtons';
import { ProductSlider } from '../../components/ProductSlider/ProductSlider';
import { CurrentPath } from '../../components/CurrentPath/CurrentPath';
import { Phone } from '../../types/Phone';
import { Tablet } from '../../types/Tablet';
import { Accessory } from '../../types/Accessory';
import { useUnique } from '../../utils/useUnique';

export const ProductPage: React.FC = () => {
  const {
    uniqueProductFromServer,
    phonesFromServer,
    tabletsFromServer,
    accessoriesFromServer,
  } = useContext(CatalogContext);
  const { itemId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const currentProduct = GetCurrentProduct(
    uniqueProductFromServer?.find(item => item.id === itemId),
  );
  // eslint-disable-next-line
  const [currentTypeProducts, setCurrentTypeProducts] = useState<Phone[] | Tablet[] | Accessory[]>([]);

  useEffect(() => {
    switch (currentProduct?.category) {
      case 'phones':
        setCurrentTypeProducts(
          // eslint-disable-next-line
          useUnique(phonesFromServer)?.filter(
            product => product.category === 'phones',
          ) || null,
        );
        break;
      case 'tablets':
        setCurrentTypeProducts(
          // eslint-disable-next-line
          useUnique(tabletsFromServer)?.filter(
            product => product.category === 'tablets',
          ) || null,
        );
        break;
      default:
        setCurrentTypeProducts(
          // eslint-disable-next-line
          useUnique(accessoriesFromServer)?.filter(
            product => product.category === 'accessories',
          ) || null,
        );
        break;
    }
  }, []);

  useEffect(() => {
    const scrollPosition = localStorage.getItem('scrollPosition');

    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition, 10));
    }
  }, []);

  const isTablet = useMediaQuery({ query: '(min-width: 640px)' });
  const isDesctop = useMediaQuery({ query: '(min-width: 1200px)' });

  const slidesPerView = () => {
    if (isDesctop) {
      return 4;
    }

    if (isTablet) {
      return 2;
    }

    return 1;
  };

  const goBack = () => {
    const from = location.state?.from || '/';

    navigate(from);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <section className="product">
      <div className="container">
        <CurrentPath currentProduct={currentProduct} />
        <button className="product__back-button" onClick={goBack}>
          <span>Back</span>
        </button>
        <h2 className="title product__title">{currentProduct?.name}</h2>
        <div className="product__page">
          <div className="product__page-item product__first-info">
            <div className="product__image-slider">
              <ImageGalery currentProduct={currentProduct} />
            </div>
            <div className="product__main-info">
              <div className="product__color-check">
                <h3 className="product__filter-name">
                  Available colors
                  <span className="product__id">ID: {currentProduct?.id}</span>
                </h3>

                <ProductParametrBox
                  currentProduct={currentProduct}
                  parametr="color"
                />
              </div>
              <div className="product__capacity-check">
                <h3 className="product__filter-name">capacity aviliable</h3>
                <ProductParametrBox
                  currentProduct={currentProduct}
                  parametr="capacity"
                />
              </div>
              <div className="product__price-action-container">
                <Price currentItem={currentProduct} section="product" />
                <ProductButtons
                  currentProduct={uniqueProductFromServer?.find(
                    item => item.id === itemId,
                  )}
                />
              </div>
              <div className="product__infos-container">
                <ProductInfo
                  name="screen"
                  value={currentProduct?.screen || '-'}
                />
                <ProductInfo
                  name="resolution"
                  value={currentProduct?.resolution || '-'}
                />
                <ProductInfo
                  name="processor"
                  value={currentProduct?.processor || '-'}
                />
                <ProductInfo name="RAM" value={currentProduct?.ram || '-'} />
              </div>
            </div>
          </div>
          <div className="product__page-item product__second-info">
            <div className="product__second-info--block">
              <h2 className="product__info-title">about</h2>
              <div className="product__description">
                {currentProduct?.description.map((item, index) => (
                  <div key={index}>
                    <h3 className="product__description-title">{item.title}</h3>
                    <p className="product__description-text">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="product__second-info--block">
              <h2 className="product__info-title">Tech specs</h2>
              {currentProduct && 'screen' in currentProduct && (
                <ProductInfo
                  name="screen"
                  value={currentProduct.screen || '-'}
                />
              )}
              {currentProduct && 'resolution' in currentProduct && (
                <ProductInfo
                  name="resolution"
                  value={currentProduct.resolution || '-'}
                />
              )}
              {currentProduct && 'processor' in currentProduct && (
                <ProductInfo
                  name="processor"
                  value={currentProduct.processor || '-'}
                />
              )}
              {currentProduct && 'ram' in currentProduct && (
                <ProductInfo name="RAM" value={currentProduct.ram || '-'} />
              )}
              {currentProduct && 'camera' in currentProduct && (
                <ProductInfo
                  name="camera"
                  value={currentProduct.camera || '-'}
                />
              )}
              {currentProduct && 'zoom' in currentProduct && (
                <ProductInfo name="zoom" value={currentProduct.zoom || '-'} />
              )}
              {currentProduct && 'cell' in currentProduct && (
                <ProductInfo
                  name="cell"
                  value={currentProduct.cell.join(', ') || '-'}
                />
              )}
            </div>
          </div>
          <div className="may-like">
            <div className="may-like__title-box product__title-box">
              <h2 className="title may-like__title">You may also like</h2>
              <ProductSliderButtons
                products={currentTypeProducts}
                section={'may-like'}
                slides={slidesPerView()}
              />
            </div>

            <ProductSlider
              models={currentTypeProducts}
              sectionName={'may-like'}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
