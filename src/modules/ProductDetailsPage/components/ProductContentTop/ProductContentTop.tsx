import './ProductContentTop.scss';
import { useNavigate, useParams } from 'react-router-dom';
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

  const { productsType } = useParams();

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

  useEffect(() => {
    const newUrl = getNewProduct(
      selectedPhone.namespaceId,
      selectedCapacity,
      selectedColor,
    );

    navigate(`/${productsType}/${newUrl}`);
  }, [selectedColor, selectedCapacity, selectedPhone.namespaceId]);

  return (
    <div className="detailsPage__content-top">
      <div className="detailsPage__container-imageSlider">
        {selectedPhone.images.map((image, index) => (
          <div
            key={index}
            className={`detailsPage__container-photos ${
              selectedPhoto === index
                ? 'detailsPage__container-photos--active'
                : ''
            }`}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="detailsPage__photo"
              onClick={() => setSelectedPhoto(index)}
            />
          </div>
        ))}
      </div>

      <div className="detailsPage__photo-mask">
        <img
          src={selectedPhone.images[selectedPhoto]}
          alt={`Selected Photo`}
          className="detailsPage__image"
        />
      </div>

      <div className="detailsPage__characteristics">
        <div className="detailsPage__colors">
          <span
            className="
              detailsPage__colors-title detailsPage__info"
          >
            Available colors
          </span>
          <ul className="detailsPage__colors-list">
            {selectedPhone.colorsAvailable.map(color => (
              <li
                key={color}
                className={`detailsPage__color-item ${selectedColor === color
                  ? 'detailsPage__color-item--selected'
                  : ''
                  }`}
                onClick={() => handleColorChange(color)}
              >
                <span
                  className="detailsPage__color-circle"
                  style={{ backgroundColor: colors[color] }}
                ></span>
              </li>
            ))}
          </ul>
        </div>

        <div className="detailsPage__line"></div>

        <div className="detailsPage__capacity">
          <span
            className="
                detailsPage__capacity-title detailsPage__info"
          >
            Select capacity
          </span>
          <ul className="detailsPage__capacity-list">
            {selectedPhone.capacityAvailable.map(capacity => (
              <li
                key={capacity}
                className={`detailsPage__capacity-item ${selectedCapacity === capacity
                  ? 'detailsPage__capacity-item--selected'
                  : ''
                  }`}
                onClick={() => handleCapacityChange(capacity)}
              >
                <span
                  className={`detailsPage__capacity-block ${selectedCapacity === capacity
                    ? 'detailsPage__capacity-block--selected'
                    : ''
                    }`}
                >
                  {capacity.split('GB').join(' GB')}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="detailsPage__line"></div>

        <div className="detailsPage__container-price">
          <span className="detailsPage__price-discount">
            {`$${selectedPhone.priceDiscount}`}
          </span>
          <span className="detailsPage__price-regular">
            {`$${selectedPhone.priceRegular}`}
          </span>
        </div>

        <div className="detailsPage__container-buttons">
          <button className="detailsPage__button-addToCard">Add to cart</button>
          <button className="detailsPage__button-addToFavourite"></button>
        </div>

        <div className="detailsPage__container-specifications">
          <div className="detailsPage__block">
            <span className="detailsPage__info">Screen</span>
            <span className="detailsPage__value">{selectedPhone.screen}</span>
          </div>
          <div className="detailsPage__block">
            <span className="detailsPage__info">Resolution</span>
            <span className="detailsPage__value">
              {selectedPhone.resolution}
            </span>
          </div>
          <div className="detailsPage__block">
            <span className="detailsPage__info">Processor</span>
            <span className="detailsPage__value">
              {selectedPhone.processor}
            </span>
          </div>
          <div className="detailsPage__block">
            <span className="detailsPage__info">RAM</span>
            <span className="detailsPage__value">{selectedPhone.ram}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
