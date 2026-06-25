import { useState } from 'react';
import styles from './ModelControls.module.scss';
import { Price } from '../../../../components/Price';
import { ButtonAddToCart } from '../../../../components/ButtonAddToCart';
import { ModelAvailbleVariants } from '../ModelAvailableVariants';
import { Model } from '../../../shared/types/Model';
import { ModelCharact } from '../../../../components/ModelCharact';

export const ModelControls = ({
  model,
  onVariantChange,
}: {
  model: Model;
  onVariantChange: (color: string, capacity: string) => void;
}) => {
  const [current, setCurrent] = useState(0);
  let startX = 0;

  const handleTouchStart = (e: React.TouchEvent) => {
    startX = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (diff > 50 && model) {
      setCurrent(prev => (prev + 1) % model.images.length);
    } else if (diff < -50 && model) {
      setCurrent(
        prev => (prev - 1 + model.images.length) % model.images.length,
      );
    }
  };

  const characteristics: (keyof Model)[] = [
    'screen',
    'capacity',
    'processor',
    'ram',
  ];

  return (
    <div className={styles.model}>
      <div
        className={styles.model__slider}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={styles.model__images}
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {model?.images?.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Slide ${index + 1}`}
              className={styles.model__image}
            />
          ))}
        </div>
      </div>

      <div className={styles.model__indicators}>
        {model?.images.map((img, index) => (
          <img
            src={img}
            alt="Model image"
            key={index}
            onClick={() => setCurrent(index)}
            className={styles.model__indicator}
            style={
              current === index
                ? { borderColor: '#313237', transition: 'border-color, 0.3s' }
                : undefined
            }
          />
        ))}
        <></>
      </div>

      <div className={styles.model__info}>
        <div className={styles.model__variants}>
          <ModelAvailbleVariants
            text="Available colors"
            variantsAvailble={model.colorsAvailable}
            setModelVariant={newColor =>
              onVariantChange(newColor, model.capacity)
            }
            className="color"
            model={model}
          />
          <ModelAvailbleVariants
            text="Select capacity"
            variantsAvailble={model.capacityAvailable}
            setModelVariant={newCap => onVariantChange(model.color, newCap)}
            className="capacity"
            model={model}
          />
        </div>
        <div className={styles.model__actions}>
          <Price
            price={model?.priceDiscount || 0}
            fullPrise={model?.priceRegular || 0}
            levelTitle={2}
            levelTitleSize={'price-big'}
          />
          <ButtonAddToCart size={48} productId={model?.id || ''} />
        </div>
        <div className={styles.model__characteristics}>
          {model &&
            characteristics.map(characteristic => (
              <ModelCharact
                product={model}
                property={characteristic}
                key={characteristic}
                weight={600}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
