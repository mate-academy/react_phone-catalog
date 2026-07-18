import React, { useEffect, useState } from 'react';
import './ProductDetails.scss';
import { ProductCompleted } from '../../../../types/ProductCompleted';
import classNames from 'classnames';
import { Line } from '../../../shared/components/Line';
import { BlockPrice } from '../../../shared/components/BlockPrice';
import { SpecsProduct } from '../../../shared/components/SpecsProduct';
// eslint-disable-next-line max-len
import { CapacityAvailable } from './components/CapacityAvailable';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line max-len
import { AddToCartButton } from '../../../shared/components/Buttons/AddToCartButton';
import { useGlobalContext } from '../../../../context/GlobalContext';
import { useLanguage } from '../../../../context/LanguageContext';
import { ColorsAvailable } from './components/ColorsAvailable';

type Props = {
  className: string;
  activeProduct: ProductCompleted;
};

export const ProductDetails: React.FC<Props> = ({
  className,
  activeProduct,
}) => {
  const [activePhoto, setActivePhoto] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  const [activeColor, setActiveColor] = useState<string>(activeProduct.color);
  const [activeCapacity, setActiveCapacity] = useState<string>(
    activeProduct.capacity,
  );
  const navigate = useNavigate();
  const { allProducts } = useGlobalContext();
  const { texts } = useLanguage();

  //#region functions

  const handleAnimationPhoto = (newPhoto: number) => {
    if (newPhoto !== activePhoto) {
      setShowAnimation(true);

      setTimeout(() => {
        setActivePhoto(newPhoto);
        setShowAnimation(false);
      }, 200);
    }
  };

  useEffect(() => {
    setActiveColor(activeProduct.color);
    setActivePhoto(0);
    setActiveCapacity(activeProduct.capacity);
  }, [activeProduct]);

  const handleColors = (newColor: string) => {
    const newPath =
      activeProduct.namespaceId +
      `-${activeProduct.capacity.toLowerCase()}-${newColor}`;

    navigate('/product/' + newPath);
    setActiveColor(newColor);
  };

  const handleCapacitys = (newCapacity: string) => {
    const newPath =
      activeProduct.namespaceId +
      `-${newCapacity.toLowerCase()}-${activeProduct.color}`;

    navigate('/product/' + newPath);
    setActiveCapacity(newCapacity);
  };

  //#endregion functions

  return (
    <div className={`product-details ${className}`}>
      <h2 className="product-details__title">{activeProduct.name}</h2>
      <div className="product-details__region-item">
        <div className="product-details__photo">
          <div className="product-details__photo-wrapper">
            <img
              src={activeProduct.images[activePhoto]}
              alt={activeProduct.name}
              className="product-details__main-photo"
              style={{
                opacity: showAnimation ? 0.1 : 1,
                transition: 'opacity 0.2s ease',
              }}
            />
          </div>
          <div className="product-details__photo-previews">
            {activeProduct.images.slice(0, 6).map((img, index) => (
              <img
                src={img}
                alt={img}
                className={classNames('product-details__photo-preview', {
                  'product-details__photo-preview--is-active':
                    activePhoto === index,
                })}
                key={index}
                onClick={() => handleAnimationPhoto(index)}
              />
            ))}
          </div>
        </div>
        <div className="product-details__main-controls">
          <div
            className="
              product-details__section
              product-details__section--colors
            "
          >
            {activeColor && (
              <ColorsAvailable
                className="product-details__colors-available"
                activeColor={activeColor}
                colorsAvailable={activeProduct.colorsAvailable}
                changeColor={prev => handleColors(prev)}
              />
            )}
            <p className="product-details__id">{`ID:${activeProduct.namespaceId}`}</p>
          </div>
          <Line className="product-details__line" />
          <div
            className="
              product-details__section
              product-details__section--capacity
            "
          >
            {activeCapacity && (
              <CapacityAvailable
                className="product-details__capacity-available"
                activeCapacity={activeCapacity}
                capacitysAvailable={activeProduct.capacityAvailable}
                changeCapacity={prev => handleCapacitys(prev)}
              />
            )}
          </div>
          <Line className="product-details__line" />
          <div
            className="
              product-details__section
              product-details__section--price
            "
          >
            <BlockPrice
              className="product-details__block-price"
              fullPrice={activeProduct.priceRegular}
              price={activeProduct.priceDiscount}
              showDiscount={true}
              sizePrice={32}
            />
            <AddToCartButton
              className="product-card__add-to-cart-button"
              item={allProducts.find(
                product => product.itemId === activeProduct.id,
              )}
            />
          </div>
          <div
            className="
              product-details__section
              product-details__section--specs-product
            "
          >
            <SpecsProduct
              className="product-details__specs-product"
              specs={[
                { key: 'ram', value: activeProduct.ram },
                { key: 'screen', value: activeProduct.screen },
                { key: 'processor', value: activeProduct.processor },
                { key: 'capacity', value: activeProduct.capacity },
              ]}
            />
          </div>
        </div>
      </div>
      <div className="product-details__region-description">
        <div className="product-details__about">
          <div className="product-details__about-title">
            <h3 className="product-details__subtitle">{texts.about}</h3>
            <Line />
          </div>
          {activeProduct.description.map(oneDescription => {
            return (
              <div
                className="product-details__description"
                key={oneDescription.title}
              >
                <h4 className="product-details__description-title">
                  {oneDescription.title}
                </h4>
                <p className="product-details__text">
                  {oneDescription.text.length === 1
                    ? oneDescription.text
                    : oneDescription.text.map(oneText => oneText)}
                </p>
              </div>
            );
          })}
        </div>
        <div className="product-details__region-specs-product">
          <h3 className="product-details__subtitle">{texts.techSpecs}</h3>
          <Line />
          <SpecsProduct
            className="product-details__all-specs-product"
            specs={[
              { key: 'screen', value: activeProduct.screen },
              { key: 'resolution', value: activeProduct.resolution },
              { key: 'processor', value: activeProduct.processor },
              { key: 'ram', value: activeProduct.ram },
              { key: 'builtInMemory', value: activeProduct.capacity },
              { key: 'camera', value: activeProduct.camera },
              { key: 'zoom', value: activeProduct.zoom },
              { key: 'cell', value: activeProduct.cell },
            ]}
          />
        </div>
      </div>
    </div>
  );
};
