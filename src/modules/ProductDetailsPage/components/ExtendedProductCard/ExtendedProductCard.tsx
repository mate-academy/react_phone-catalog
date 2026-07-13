import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ExtendedProductCard.module.scss';
// eslint-disable-next-line max-len
import { ProductCardActions } from '../../../shared/components/ProductCardActions';
import { ProductDetail, Description } from '../../../shared/types/Product';

const colorMap: Record<string, string> = {
  black: '#1F2020',
  green: '#AEE1CD',
  yellow: '#FFE681',
  white: '#F9F6EF',
  purple: '#D1CDDA',
  red: '#BA0C2E',
  gold: '#F3E2CF',
  midnightgreen: '#4E5851',
  silver: '#EBEBE3',
  spacegray: '#535150',
  coral: '#EE7762',
  midnight: '#171E27',
  blue: '#215E7C',
  pink: '#FAE0D8',
  sierrablue: '#A7C1D9',
  spaceblack: '#505150',
  graphite: '#4C4D4A',
};

type PropSpec = {
  arraySpecs: Description[];
};

type PropTechSpec = {
  arraySpecs: { title: string; text: string | string[] }[];
};

const Specs: React.FC<PropSpec> = ({ arraySpecs }) => (
  <>
    {arraySpecs.map(specsItem => (
      <div
        className={styles['extended-product-card__description-block']}
        key={specsItem.title}
      >
        <h4 className={styles['extended-product-card__description-title']}>
          {specsItem.title}
        </h4>
        <p className={styles['extended-product-card__description-text']}>
          {specsItem.text.join(' ')}
        </p>
      </div>
    ))}
  </>
);

const TechSpecs: React.FC<PropTechSpec> = ({ arraySpecs }) => (
  <div className={styles['extended-product-card__tech-spec-list']}>
    {arraySpecs.map(spec => (
      <div
        key={spec.title}
        className={styles['extended-product-card__tech-spec-item']}
      >
        <span className={styles['extended-product-card__tech-spec-label']}>
          {spec.title}
        </span>
        <span className={styles['extended-product-card__tech-spec-value']}>
          {spec.text}
        </span>
      </div>
    ))}
  </div>
);

export const ExtendedProductCard: React.FC<ProductDetail> = ({
  id,
  category,
  namespaceId,
  name,
  capacityAvailable,
  capacity,
  priceRegular,
  priceDiscount,
  colorsAvailable,
  color,
  images,
  description,
  screen,
  resolution,
  processor,
  ram,
  camera,
  zoom,
  cell,
}) => {
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(images[0] || '');

  useEffect(() => {
    setActiveImage(images[0] || '');
  }, [images]);

  const { productSpecs, allSpecs } = useMemo(() => {
    const baseSpecs = [
      { title: 'Screen', text: screen },
      { title: 'Resolution', text: resolution },
      { title: 'Processor', text: processor },
      { title: 'RAM', text: ram },
    ];

    const extendedSpecs = [
      ...(camera ? [{ title: 'Camera', text: camera }] : []),
      ...(zoom ? [{ title: 'Zoom', text: zoom }] : []),
      { title: 'Cell', text: cell.join(', ') },
    ];

    return {
      productSpecs: baseSpecs,
      allSpecs: [
        ...baseSpecs,
        { title: 'Built in memory', text: capacity },
        ...extendedSpecs,
      ],
    };
  }, [screen, resolution, processor, ram, camera, zoom, cell, capacity]);

  const handleVariantChange = (newColor: string, newCapacity: string) => {
    const formattedColor = newColor.toLowerCase().replace(/\s+/g, '-');
    const formattedCapacity = newCapacity.toLowerCase();
    const newProductId = `${namespaceId}-${formattedCapacity}-${formattedColor}`;

    navigate(`/${category}/${newProductId}`);
  };

  return (
    <div className={styles['extended-product-card']}>
      <h2 className={styles['extended-product-card__title']}>{name}</h2>
      <div className={styles['extended-product-card__main']}>
        <div className={styles['extended-product-card__images']}>
          <div className={styles['extended-product-card__thumbnails']}>
            {images.map((img, index) => (
              <button
                key={img}
                className={`${styles['extended-product-card__thumbnail-button']} ${activeImage === img ? styles['extended-product-card__thumbnail-button--active'] : ''}`}
                onClick={() => setActiveImage(img)}
              >
                <img
                  src={`/${img}`}
                  alt={`Thumbnail ${index + 1}`}
                  className={styles['extended-product-card__thumbnail-image']}
                />
              </button>
            ))}
          </div>

          <div
            className={styles['extended-product-card__main-image-container']}
          >
            <img
              src={`/${activeImage}`}
              alt={name}
              className={styles['extended-product-card__main-image']}
            />
          </div>
        </div>

        <div className={styles['extended-product-card__specs-panel']}>
          <div className={styles['extended-product-card__color-header-row']}>
            <div className={styles['extended-product-card__specs-header']}>
              Available colors
            </div>
            <div
              className={`${styles['extended-product-card__specs-header']} ${styles['extended-product-card__specs-header--id']}`}
            >
              ID: {id}
            </div>
          </div>

          <div className={styles['extended-product-card__options']}>
            {colorsAvailable.map(colorName => (
              <button
                key={colorName}
                className={`${styles['extended-product-card__color-button']} ${color === colorName ? styles['extended-product-card__color-button--active'] : ''}`}
                onClick={() => handleVariantChange(colorName, capacity)}
              >
                <div
                  className={styles['extended-product-card__color-swatch']}
                  style={{ backgroundColor: colorMap[colorName] || colorName }}
                ></div>
              </button>
            ))}
          </div>

          <div className={styles['extended-product-card__divider']}></div>
          <div className={styles['extended-product-card__specs-header']}>
            Select capacity
          </div>
          <div className={styles['extended-product-card__options']}>
            {capacityAvailable.map(capacityName => (
              <button
                key={capacityName}
                className={`${styles['extended-product-card__capacity-button']} ${capacity === capacityName ? styles['extended-product-card__capacity-button--active'] : ''}`}
                onClick={() => handleVariantChange(color, capacityName)}
              >
                {capacityName}
              </button>
            ))}
          </div>

          <div className={styles['extended-product-card__divider']}></div>
          <div className={styles['extended-product-card__prices']}>
            {priceDiscount ? (
              <>
                <span
                  className={styles['extended-product-card__price-discount']}
                >
                  ${priceDiscount}
                </span>
                <span
                  className={
                    styles['extended-product-card__price-regular-strike']
                  }
                >
                  ${priceRegular}
                </span>
              </>
            ) : (
              <span className={styles['extended-product-card__price-regular']}>
                ${priceRegular}
              </span>
            )}
          </div>
          <ProductCardActions
            product={{
              id: id,
              name: name,
              price: priceDiscount ? priceDiscount : priceRegular,
              img: `/${images[0]}`,
              category: category,
            }}
          />
          <div className={styles['extended-product-card__tech-specs']}>
            <TechSpecs arraySpecs={productSpecs} />
          </div>
        </div>
      </div>
      <div className={styles['extended-product-card__details']}>
        <div className={styles['extended-product-card__about']}>
          <h3 className={styles['extended-product-card__section-title']}>
            About
          </h3>
          <div className={styles['extended-product-card__divider']}></div>
          <Specs arraySpecs={description} />
        </div>
        <div className={styles['extended-product-card__tech-specs-section']}>
          <h3 className={styles['extended-product-card__section-title']}>
            Tech specs
          </h3>
          <div className={styles['extended-product-card__divider']}></div>
          <TechSpecs arraySpecs={allSpecs} />
        </div>
      </div>
    </div>
  );
};
