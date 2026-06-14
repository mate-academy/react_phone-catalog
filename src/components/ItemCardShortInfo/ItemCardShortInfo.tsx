import classNames from 'classnames';
import { Accessory, Phone, Product, Tablet } from '../../shared/types';
import { useSwipeable } from 'react-swipeable';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import itemCardShortInfoStyles from './ItemCardShortInfo.module.scss';
import { ColorSelector } from '../ColorSelector';
import { SecondaryButton } from '../SecondaryButton';
import { AddToCartButton } from '../AddToCartButton';
import { FavoritesButton } from '../FavoritesButton';

type ProductDetails = Phone | Tablet | Accessory;

const normalizeColorForId = (color: string) => {
  return color.toLowerCase().replace(/\s+/g, '-');
};

const getProductDetailsId = (
  namespaceId: string,
  capacity: string,
  color: string,
) => {
  return `${namespaceId}-${capacity.toLowerCase()}-${normalizeColorForId(color)}`;
};

type Props = {
  productDetails: ProductDetails;
  product: Product;
};

export const ItemCardShortInfo = ({ productDetails, product }: Props) => {
  const [selectedImg, setSelectedImg] = useState(0);
  const navigate = useNavigate();

  const showPrevImage = () => {
    if (!productDetails) {
      return;
    }

    setSelectedImg(currentIndex =>
      currentIndex === 0 ? productDetails.images.length - 1 : currentIndex - 1,
    );
  };

  const showNextImage = () => {
    if (!productDetails) {
      return;
    }

    setSelectedImg(currentIndex =>
      currentIndex === productDetails.images.length - 1 ? 0 : currentIndex + 1,
    );
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: showNextImage,
    onSwipedRight: showPrevImage,
    trackMouse: true,
  });

  const handleColorChange = (color: string) => {
    if (!productDetails || color === productDetails.color) {
      return;
    }

    const nextProductId = getProductDetailsId(
      productDetails.namespaceId,
      productDetails.capacity,
      color,
    );

    navigate(`/${productDetails.category}/${nextProductId}`);
  };

  const handleCapacityChange = (capacity: string) => {
    if (!productDetails || capacity === productDetails.capacity) {
      return;
    }

    const nextProductId = getProductDetailsId(
      productDetails.namespaceId,
      capacity,
      productDetails.color,
    );

    navigate(`/${productDetails.category}/${nextProductId}`);
  };

  const isDiscountPresent =
    productDetails.priceDiscount !== productDetails.priceRegular;

  return (
    <article>
      <h2 className={classNames('font-h2', itemCardShortInfoStyles.Title)}>
        {productDetails.name}
      </h2>
      <div className={itemCardShortInfoStyles.ContentWrapper}>
        <div className={itemCardShortInfoStyles.ImageContainer}>
          <div {...swipeHandlers}>
            <img
              src={productDetails.images[selectedImg]}
              alt={productDetails.name}
              className={itemCardShortInfoStyles.MainImage}
            />
          </div>
          <div className={itemCardShortInfoStyles.SmallImages}>
            {productDetails.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={productDetails.name}
                onClick={() => setSelectedImg(index)}
                className={classNames(
                  itemCardShortInfoStyles.SmallImage,
                  selectedImg === index &&
                    itemCardShortInfoStyles.SmallImageActive,
                )}
              />
            ))}
          </div>
        </div>
        <div className={itemCardShortInfoStyles.AdditionalInfoContainer}>
          <section className={itemCardShortInfoStyles.ColorSelectorSection}>
            <ColorSelector
              colors={productDetails.colorsAvailable}
              selectedColor={productDetails.color}
              handleColorChange={handleColorChange}
            />

            <span className={'font-small'}>
              ID:{product.id.toString().padStart(6, '0')}
            </span>
          </section>
          <div className={itemCardShortInfoStyles.HorizontalLine}></div>
          <section className={itemCardShortInfoStyles.CapacitySection}>
            <span
              className={classNames(
                'font-small',
                itemCardShortInfoStyles.CapacitySubtitle,
              )}
            >
              Select capacity
            </span>
            <div className={itemCardShortInfoStyles.CapacityButtons}>
              {productDetails.capacityAvailable.map(capacity => (
                <div
                  key={capacity}
                  className={itemCardShortInfoStyles.CapacityButtonWrapper}
                >
                  <SecondaryButton
                    isSelected={capacity === productDetails.capacity}
                    onClick={() => handleCapacityChange(capacity)}
                  >
                    {capacity}
                  </SecondaryButton>
                </div>
              ))}
            </div>
          </section>
          <div className={itemCardShortInfoStyles.HorizontalLine}></div>
          <section className={itemCardShortInfoStyles.PriceAndButtons}>
            <h2
              className={classNames('font-h2', itemCardShortInfoStyles.Prices)}
            >
              <span
                className={itemCardShortInfoStyles.NewPrice}
              >{`$${isDiscountPresent ? productDetails.priceDiscount : productDetails.priceRegular}`}</span>
              {isDiscountPresent && (
                <span className={itemCardShortInfoStyles.OldPrice}>
                  {`$${productDetails.priceRegular}`}
                </span>
              )}
            </h2>
            <div className={itemCardShortInfoStyles.Buttons}>
              <AddToCartButton product={product} />
              <FavoritesButton product={product} />
            </div>
            <div
              className={classNames(
                'font-small',
                itemCardShortInfoStyles.Details,
              )}
            >
              <p className={itemCardShortInfoStyles.DetailsInfo}>
                <span className={itemCardShortInfoStyles.DetailTitle}>
                  Screen
                </span>
                <span className={itemCardShortInfoStyles.DetailText}>
                  {productDetails.screen}
                </span>
              </p>
              <p className={itemCardShortInfoStyles.DetailsInfo}>
                <span className={itemCardShortInfoStyles.DetailTitle}>
                  Resolution
                </span>
                <span className={itemCardShortInfoStyles.DetailText}>
                  {productDetails.resolution}
                </span>
              </p>
              <p className={itemCardShortInfoStyles.DetailsInfo}>
                <span className={itemCardShortInfoStyles.DetailTitle}>
                  Processor
                </span>
                <span className={itemCardShortInfoStyles.DetailText}>
                  {productDetails.processor}
                </span>
              </p>
              <p className={itemCardShortInfoStyles.DetailsInfo}>
                <span className={itemCardShortInfoStyles.DetailTitle}>RAM</span>
                <span className={itemCardShortInfoStyles.DetailText}>
                  {productDetails.ram}
                </span>
              </p>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
};
