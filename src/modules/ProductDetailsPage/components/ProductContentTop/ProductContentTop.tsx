import { FC, useContext, useState } from 'react';
import classNames from 'classnames';
import { ProductContentTopProps } from './types/types';
import { Colors, colors } from '../../../../constants/colors';
import { icons } from '../../../../constants/icons.config';
import { GlobalContext } from '../../../../context/GlobalContext';
import { Icon } from '../../../shared/Icon';
import { useProductOperations } from './hooks/useProductOperations';
import { useProductStatus } from './hooks/useProductStatus';
import { useProductNavigation } from './hooks/useProductNavigation';
import { SpecificationItem } from './components/SpecificationItem';
import './ProductContentTop.scss';

export const ProductContentTop: FC<ProductContentTopProps> = ({
  selectedProduct,
  specificProducts,
}) => {
  const { theme } = useContext(GlobalContext);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  const { handleAddToCart, handleToggleFavorites } = useProductOperations();
  const { isInCart, isFavorite } = useProductStatus(selectedProduct);
  const { navigateToOption } = useProductNavigation(
    selectedProduct,
    specificProducts,
  );

  const renderColorOptions = () => (
    <div className="detailsPage__colors">
      <span className="detailsPage__colors-title detailsPage__info">
        Available colors
      </span>
      <ul className="detailsPage__colors-list">
        {selectedProduct.colorsAvailable.map(color => (
          <li
            key={color}
            className={classNames('detailsPage__color-item', {
              'detailsPage__color-item--selected':
                selectedProduct.color === color,
            })}
            onClick={() => navigateToOption('color', color)}
            style={{ cursor: 'pointer' }}
          >
            <span
              className="detailsPage__color-circle"
              style={{ backgroundColor: colors[color as keyof Colors] }}
            />
          </li>
        ))}
      </ul>
    </div>
  );

  const renderCapacityOptions = () => (
    <div className="detailsPage__capacity">
      <span className="detailsPage__capacity-title detailsPage__info">
        Select capacity
      </span>
      <ul className="detailsPage__capacity-list">
        {selectedProduct.capacityAvailable.map(capacity => {
          const isSelected = selectedProduct.capacity === capacity;
          const formattedCapacity = capacity.replace('GB', ' GB');

          return (
            <li
              key={capacity}
              className={classNames('detailsPage__capacity-item', {
                'detailsPage__capacity-item--selected': isSelected,
              })}
              onClick={() => navigateToOption('capacity', capacity)}
              style={{ cursor: 'pointer' }}
            >
              <span
                className={classNames('detailsPage__capacity-block', {
                  'detailsPage__capacity-block--selected': isSelected,
                })}
              >
                {formattedCapacity}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );

  const renderImageGallery = () => (
    <>
      <div className="detailsPage__container-imageSlider">
        {selectedProduct.images.map((image, index) => (
          <div
            key={index}
            className={classNames('detailsPage__container-photos', {
              'detailsPage__container-photos--active':
                selectedPhotoIndex === index,
            })}
          >
            <img
              src={`./${image}`}
              alt={`Thumbnail ${index + 1}`}
              className="detailsPage__photo"
              onClick={() => setSelectedPhotoIndex(index)}
            />
          </div>
        ))}
      </div>

      <div className="detailsPage__photo-mask">
        {selectedProduct.images.map((image, index) => (
          <img
            key={index}
            src={`./${image}`}
            alt={`Product view ${index + 1}`}
            className={classNames('detailsPage__image', {
              'detailsPage__image--active': selectedPhotoIndex === index,
            })}
          />
        ))}
      </div>
    </>
  );

  const renderActionButtons = () => (
    <div className="detailsPage__container-buttons">
      <button
        className={classNames(
          'detailsPage__button',
          'detailsPage__button-card',
          { 'detailsPage__button-card--active': isInCart },
        )}
        onClick={() => handleAddToCart(selectedProduct)}
      >
        {isInCart ? 'Added' : 'Add to cart'}
      </button>

      <button
        className={classNames(
          'detailsPage__button',
          'detailsPage__button-favorites',
          { 'detailsPage__button-favorites--active': isFavorite },
        )}
        onClick={() => handleToggleFavorites(selectedProduct)}
      >
        <Icon
          icon={
            isFavorite ? icons.favorites__filled[theme] : icons.favorites[theme]
          }
        />
      </button>
    </div>
  );

  const renderSpecifications = () => (
    <div className="detailsPage__container-specifications">
      <SpecificationItem label="Screen" value={selectedProduct.screen} />
      <SpecificationItem
        label="Resolution"
        value={selectedProduct.resolution}
      />
      <SpecificationItem label="Processor" value={selectedProduct.processor} />
      <SpecificationItem label="RAM" value={selectedProduct.ram} />
    </div>
  );

  return (
    <div className="detailsPage__content-top">
      {renderImageGallery()}

      <div className="detailsPage__characteristics">
        {renderColorOptions()}
        <div className="detailsPage__line" />

        {renderCapacityOptions()}
        <div className="detailsPage__line" />

        <div className="detailsPage__container-price">
          <span className="detailsPage__price-discount">
            ${selectedProduct.priceDiscount}
          </span>
          <span className="detailsPage__price-regular">
            ${selectedProduct.priceRegular}
          </span>
        </div>

        {renderActionButtons()}
        {renderSpecifications()}
      </div>
    </div>
  );
};
