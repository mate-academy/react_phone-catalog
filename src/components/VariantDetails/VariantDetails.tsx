/* eslint-disable max-len */
import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import styles from './VariantDetails.module.scss';
import { Devices, MergedDevice } from '../../types/devices';
import { useAppDispatch, useAppSelector } from '../../hooks/helperToolkit';
import { addItemToCart } from '../../slices/cartSlice';
import {
  addItemToFavorites,
  removeItemFromFavorites,
} from '../../slices/favoritesSlice';

interface Props {
  currentDevice: MergedDevice;
  deviceById: Devices;
  mainImage: string;
  selectedCapacity: string;
  selectedColor: string;
  handleColorChange: (newColor: string) => void;
  handleCapacityChange: (newCapacity: string) => void;
  handleImageClick: (image: string) => void;
}

export const VariantDetails: React.FC<Props> = ({
  currentDevice,
  deviceById,
  mainImage,
  selectedCapacity,
  selectedColor,
  handleColorChange,
  handleCapacityChange,
  handleImageClick,
}) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const favorites = useAppSelector(state => state.favorites.items);
  const isFavorited = favorites.some(item => item.id === deviceById.id);
  const cartItems = useAppSelector(state => state.cart.items);
  const isInCart = cartItems.some(item => item.id === deviceById.id);
  const dispatch = useAppDispatch();
  const scrollContainerRef = useRef<HTMLUListElement | null>(null);
  const scrollThumbRef = useRef<HTMLDivElement | null>(null);

  const updateScrollThumb = () => {
    const scrollContainer = scrollContainerRef.current;
    const scrollThumb = scrollThumbRef.current;

    if (scrollContainer && scrollThumb) {
      const scrollWidth = scrollContainer.scrollWidth;
      const clientWidth = scrollContainer.clientWidth;
      const scrollLeft = scrollContainer.scrollLeft;

      const scrollPercent = (scrollLeft / (scrollWidth - clientWidth)) * 100;
      const thumbWidthPercent = (clientWidth / scrollWidth) * 100;

      scrollThumb.style.width = `${thumbWidthPercent}%`;
      scrollThumb.style.transform = `translateX(${scrollPercent}%)`;
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', updateScrollThumb);
      window.addEventListener('resize', updateScrollThumb);
      updateScrollThumb();

      return () => {
        scrollContainer.removeEventListener('scroll', updateScrollThumb);
        window.removeEventListener('resize', updateScrollThumb);
      };
    }
  }, []);

  const isValidCssColor = (color: string) => {
    const styleColor = new Option().style;

    styleColor.color = color;

    return styleColor.color !== '';
  };

  useEffect(() => {
    setIsClicked(isInCart);
  }, [isInCart]);

  const addToCartHandler = () => {
    const product = {
      id: deviceById.id,
      name: deviceById.name,
      price: deviceById.priceDiscount,
      image: deviceById.images[0],
      itemId: deviceById.id,
      category: deviceById.category,
    };

    dispatch(addItemToCart({ item: product }));
    setIsClicked(true);
  };

  const toggleFavoritesHandler = () => {
    const product = {
      id: deviceById.id,
      name: deviceById.name,
      price: deviceById.priceDiscount,
      fullPrice: deviceById.priceRegular,
      image: deviceById.images[0],
      itemId: deviceById.id,
      category: deviceById.category,
      ram: deviceById.ram,
      screen: deviceById.screen.replace(/\s*\(.*?\)\s*/g, ''),
      capacity: deviceById.capacity,
    };

    if (isFavorited) {
      dispatch(removeItemFromFavorites(deviceById.id));
    } else {
      dispatch(addItemToFavorites({ item: product }));
    }
  };

  const techSpecs = [
    { label: 'Screen', value: deviceById?.screen },
    { label: 'Resolution', value: deviceById?.resolution },
    { label: 'Processor', value: deviceById?.processor },
    { label: 'RAM', value: deviceById?.ram },
  ];

  return (
    <>
      <div className={styles.containerImage}>
        <img src={mainImage} alt={deviceById?.name} className={styles.image} />
      </div>

      <ul className={styles.collection}>
        {deviceById?.images.map(image => (
          <li
            key={image}
            className={cn(styles.collectionItem, {
              [styles.isActive]: image === mainImage,
            })}
            onClick={() => handleImageClick(image)}
          >
            <img
              src={image}
              alt={deviceById?.name}
              className={styles.collectionImage}
            />
          </li>
        ))}
      </ul>

      <div className={styles.colorsTitleBox}>
        <p className={styles.colorsTitle}>Available colors</p>
        <p className={styles.productId}>
          ID: {currentDevice?.id?.toString().padStart(6, '0')}
        </p>
      </div>

      <div className={styles.variant}>
        <ul className={styles.colorList}>
          {deviceById?.colorsAvailable.map(colorOption => (
            <li
              key={colorOption}
              className={cn(styles.colorWrapper, {
                [styles.activeColor]: colorOption === selectedColor,
              })}
              onClick={() => handleColorChange(colorOption)}
            >
              <div
                className={styles.colorItem}
                style={{
                  backgroundColor: isValidCssColor(colorOption)
                    ? colorOption
                    : 'black',
                }}
              ></div>
            </li>
          ))}
        </ul>

        <p className={styles.capacityTitle}>Select capacity</p>
        <ul className={styles.capacityList}>
          {deviceById?.capacityAvailable.map(memory => (
            <li
              key={memory}
              className={cn(styles.capacityItem, {
                [styles.activeCapacity]: memory === selectedCapacity,
              })}
              onClick={() => handleCapacityChange(memory)}
            >
              {memory}
            </li>
          ))}
        </ul>

        <div className={styles.price}>
          <h2 className={styles.discountPrice}>${deviceById?.priceDiscount}</h2>

          <span className={styles.regularPrice}>
            ${deviceById?.priceRegular}
          </span>
        </div>

        <div className={styles.buttons}>
          <button
            onClick={addToCartHandler}
            className={`${styles.addToCartButton} ${isClicked && styles.addedToCart}`}
          >
            {isClicked ? 'Added' : 'Add to cart'}
          </button>

          <button
            onClick={toggleFavoritesHandler}
            className={`${styles.heartIconButton} ${isFavorited ? styles.favoritedButton : ''}`}
          >
            <svg
              width="16"
              height="14"
              viewBox="0 0 16 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              overflow="visible"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.3 0.298782C10.7264 0.298782 10.1584 0.411797 9.62852 0.631371C9.09865 0.850924 8.61711 1.17283 8.21162 1.57847L8.00005 1.79005L7.78835 1.57836C6.96928 0.759288 5.85839 0.299139 4.70005 0.299139C3.54171 0.299139 2.43081 0.759288 1.61174 1.57836C0.792668 2.39743 0.33252 3.50833 0.33252 4.66667C0.33252 5.82501 0.792668 6.9359 1.61174 7.75497L7.50507 13.6483C7.77844 13.9217 8.22165 13.9217 8.49502 13.6483L14.3884 7.75497C14.794 7.34949 15.1158 6.86806 15.3353 6.33819C15.5549 5.80827 15.6679 5.24028 15.6679 4.66667C15.6679 4.09305 15.5549 3.52506 15.3353 2.99514C15.1158 2.46532 14.7941 1.98394 14.3885 1.57847C13.983 1.17277 13.5015 0.850945 12.9716 0.631371C12.4416 0.411797 11.8737 0.298782 11.3 0.298782Z"
                fill="currentColor"
                stroke="currentColor"
              />
            </svg>
          </button>
        </div>

        <section className={styles.specs}>
          {techSpecs
            .filter(spec => spec.value)
            .map(spec => (
              <div className={styles.specsBox} key={spec.label}>
                <p className={styles.specsTitle}>{spec.label}</p>
                <p className={styles.specsDesc}>{spec.value}</p>
              </div>
            ))}
        </section>
      </div>
    </>
  );
};
