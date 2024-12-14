import './ProductContentTop.scss';
import { useNavigate } from 'react-router-dom';
import { SpecificProduct } from '../../../../types/SpecificProduct';
import { useEffect, useState } from 'react';
import { colors } from '../../../../utils/colors';

type Props = {
  selectedPhone: SpecificProduct;
};

export const ProductContentTop: React.FC<Props> = ({ selectedPhone }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const [selectedColor, setSelectedColor] = useState(selectedPhone.color);
  const [selectedCapacity, setSelectedCapacity] = useState(
    selectedPhone.capacity,
  );
  const navigate = useNavigate();

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  const handleCapacityChange = (capacity: string) => {
    setSelectedCapacity(capacity);
  };

  const getNewProduct = (
    shortName: string,
    capacity: string,
    color: string,
  ) => {
    return `${shortName}-${capacity}-${color}`.toLowerCase();
  };
  // Обновляем URL, когда меняются selectedColor или selectedCapacity

  useEffect(() => {
    // Формируем новый URL
    const newUrl = getNewProduct(
      selectedPhone.namespaceId,
      selectedCapacity,
      selectedColor,
    );

    navigate(`/product/${newUrl}`, { replace: true });
  }, [selectedColor, selectedCapacity, selectedPhone.namespaceId, navigate]);

  return (
    <div className="productDetailsPage__content-top">
      <div className="productDetailsPage__container-photosSlider">
        {selectedPhone.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className={`productDetailsPage__photoSlider ${
              selectedPhoto === index
                ? 'productDetailsPage__photoSlider--active'
                : ''
            }`}
            onClick={() => setSelectedPhoto(index)}
          />
        ))}
      </div>

      <div className="productDetailsPage__photo-mask">
        <img
          src={selectedPhone.images[selectedPhoto]}
          alt={`Selected Photo`}
          className="productDetailsPage__image"
        />
      </div>

      <div className="productDetailsPage__characteristics">
        <div className="productDetailsPage__colors">
          <span
            className="
              productDetailsPage__colors-title productDetailsPage__info"
          >
            Available colors
          </span>
          <ul className="productDetailsPage__colors-list">
            {selectedPhone.colorsAvailable.map(color => (
              <li
                key={color}
                className={`productDetailsPage__color-item ${
                  selectedColor === color
                    ? 'productDetailsPage__color-item--selected'
                    : ''
                }`}
                onClick={() => handleColorChange(color)}
              >
                <span
                  className="productDetailsPage__color-circle"
                  style={{ backgroundColor: colors[color] }}
                ></span>
              </li>
            ))}
          </ul>
        </div>

        <div className="productDetailsPage__line"></div>

        <div className="productDetailsPage__capacity">
          <span
            className="
                productDetailsPage__capacity-title productDetailsPage__info"
          >
            Select capacity
          </span>
          <ul className="productDetailsPage__capacity-list">
            {selectedPhone.capacityAvailable.map(capacity => (
              <li
                key={capacity}
                className={`productDetailsPage__capacity-item ${
                  selectedCapacity === capacity
                    ? 'productDetailsPage__capacity-item--selected'
                    : ''
                }`}
                onClick={() => handleCapacityChange(capacity)}
              >
                <span
                  className={`productDetailsPage__capacity-block ${
                    selectedCapacity === capacity
                      ? 'productDetailsPage__capacity-block--selected'
                      : ''
                  }`}
                >
                  {capacity.split('GB').join(' GB')}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="productDetailsPage__line"></div>

        <div className="productDetailsPage__container-price">
          <span className="productDetailsPage__price-discount">
            {`$${selectedPhone.priceDiscount}`}
          </span>
          <span className="productDetailsPage__price-regular">
            {`$${selectedPhone.priceRegular}`}
          </span>
        </div>

        <div className="productDetailsPage__container-buttons">
          <button className="productDetailsPage__button-addToCard">
            Add to cart
          </button>
          <button className="productDetailsPage__button-addToFavourite"></button>
        </div>

        <div className="productDetailsPage__container-specifications">
          <div className="productDetailsPage__block">
            <span className="productDetailsPage__info">Screen</span>
            <span className="productDetailsPage__value">
              {selectedPhone.screen}
            </span>
          </div>
          <div className="productDetailsPage__block">
            <span className="productDetailsPage__info">Resolution</span>
            <span className="productDetailsPage__value">
              {selectedPhone.resolution}
            </span>
          </div>
          <div className="productDetailsPage__block">
            <span className="productDetailsPage__info">Processor</span>
            <span className="productDetailsPage__value">
              {selectedPhone.processor}
            </span>
          </div>
          <div className="productDetailsPage__block">
            <span className="productDetailsPage__info">RAM</span>
            <span className="productDetailsPage__value">
              {selectedPhone.ram}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
