import { FC } from 'react';

import { Phone } from '../../../shared/types/Phone';
import { Product } from '../../../shared/types/Product';
import { ButtonCart } from '../../../shared/components/ButtonCart';
import { ButtonFavorite } from '../../../shared/components/ButtonFavorite';

import { colors, ColorName } from '../../../shared/types/colors';
import styles from './ProductMainInfo.module.scss';

type Props = {
  product: Phone;
  currentProductAsProduct: Product | undefined;
  selectedImage: string | null;
  setSelectedImage: (image: string) => void;
  selectedColor: ColorName | null;
  selectedCapacity: string | null;
  handleVariantChange: (
    updates: Partial<{ color: string; capacity: string }>,
  ) => void;
  inCart: boolean;
  addToCart: (product: Product) => void;
  toggleFavorite: (product: Product) => void;
  isFavorite: (id: string) => boolean;
};

export const ProductMainInfo: FC<Props> = ({
  product,
  currentProductAsProduct,
  selectedImage,
  setSelectedImage,
  selectedColor,
  selectedCapacity,
  handleVariantChange,
  inCart,
  addToCart,
  toggleFavorite,
  isFavorite,
}) => {
  return (
    <div className={styles['product-main-info']}>
      <div className={styles['product-main-info__images-container']}>
        <div className={styles['product-main-info__images-column']}>
          {product.images.map((image, i) => (
            <div
              key={i}
              className={`${styles['product-main-info__image-container']} ${
                selectedImage === image
                  ? styles['product-main-info__image-container--active']
                  : ''
              }`}
              onClick={() => setSelectedImage(image)}
            >
              <img
                className={styles['product-main-info__image']}
                src={image}
                alt={`${product.name} – image ${i + 1}`}
              />
            </div>
          ))}
        </div>

        {selectedImage && (
          <div className={styles['product-main-info__main-image-container']}>
            <img
              className={styles['product-main-info__main-image']}
              src={selectedImage}
              alt={product.name}
            />
          </div>
        )}
      </div>

      <div className={styles['product-main-info__characteristics']}>
        <div className={styles['product-main-info__options']}>
          <div className={styles['product-main-info__colors']}>
            <p className={styles['product-main-info__label']}>
              Available colors
            </p>

            <div className={styles['product-main-info__colors-list']}>
              {product.colorsAvailable.map(color => (
                <label
                  key={color}
                  className={styles['product-main-info__color-container']}
                >
                  <input
                    type="radio"
                    name="color"
                    value={color}
                    checked={selectedColor === color}
                    onChange={() => handleVariantChange({ color })}
                    className={styles['product-main-info__radio']}
                    aria-label={color}
                  />

                  <span
                    className={styles['product-main-info__color']}
                    style={{ backgroundColor: colors[color as ColorName] }}
                  />
                </label>
              ))}
            </div>
          </div>

          <div className={styles['product-main-info__line']} />

          <div className={styles['product-main-info__capacity']}>
            <p className={styles['product-main-info__label']}>
              Select capacity
            </p>

            <div className={styles['product-main-info__capacity-list']}>
              {product.capacityAvailable.map(capacity => (
                <label
                  key={capacity}
                  className={`${styles['product-main-info__capacity-container']} ${
                    selectedCapacity === capacity
                      ? styles['product-main-info__capacity-container--active']
                      : ''
                  }`}
                >
                  <input
                    type="radio"
                    name="capacity"
                    value={capacity}
                    checked={selectedCapacity === capacity}
                    onChange={() => handleVariantChange({ capacity })}
                    className={styles['product-main-info__radio']}
                  />

                  <span>{capacity}</span>
                </label>
              ))}
            </div>
          </div>

          <div className={styles['product-main-info__line']} />
        </div>

        {currentProductAsProduct && (
          <div className={styles['product-main-info__price-actions']}>
            <div className={styles['product-main-info__price']}>
              <span className={styles['product-main-info__price-discount']}>
                ${currentProductAsProduct.price}
              </span>

              <span className={styles['product-main-info__price-regular']}>
                ${currentProductAsProduct.fullPrice}
              </span>
            </div>

            <div className={styles['product-main-info__buttons']}>
              <ButtonCart
                inCart={inCart}
                onClick={() => addToCart(currentProductAsProduct)}
                size="large"
              />

              <ButtonFavorite
                selected={isFavorite(product.id)}
                onClick={() => toggleFavorite(currentProductAsProduct)}
                size="large"
              />
            </div>
          </div>
        )}

        <div className={styles['product-main-info__short-specs']}>
          <div className={styles['product-main-info__property']}>
            <span className={styles['product-main-info__property-name']}>
              Screen
            </span>

            <span className={styles['product-main-info__property-value']}>
              {product.screen}
            </span>
          </div>

          <div className={styles['product-main-info__property']}>
            <span className={styles['product-main-info__property-name']}>
              Resolution
            </span>

            <span className={styles['product-main-info__property-value']}>
              {product.resolution}
            </span>
          </div>

          <div className={styles['product-main-info__property']}>
            <span className={styles['product-main-info__property-name']}>
              Processor
            </span>

            <span className={styles['product-main-info__property-value']}>
              {product.processor}
            </span>
          </div>

          <div className={styles['product-main-info__property']}>
            <span className={styles['product-main-info__property-name']}>
              Ram
            </span>

            <span className={styles['product-main-info__property-value']}>
              {product.ram}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
