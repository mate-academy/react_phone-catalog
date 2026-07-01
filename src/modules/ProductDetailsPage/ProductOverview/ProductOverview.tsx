import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { RootState } from '../../../app/store/store';
import styles from './ProductOverview.module.scss';

type ProductItem = {
  itemId?: string;
  id: string;
};

type Props = {
  selectedProduct: {
    name: string;
    images: string[];
    colorsAvailable: string[];
    capacityAvailable: string[];
    color: string;
    capacity: string;
    priceDiscount: number;
    priceRegular: number;
    screen: string;
    resolution: string;
    processor: string;
    ram: string;
    id: string;
  } | null;
  mainImage: string;
  cartProducts: ProductItem[];
  favouritesProducts: ProductItem[];
  handleImageClick: (image: string) => void;
  handleColorClick: (color: string) => void;
  handleCapacityClick: (capacity: string) => void;
  handleCartClick: () => void;
  handleFavouritesClick: () => void;
};

const appleColorMap: Record<string, string> = {
  red: '#B91D47',
  gold: '#F5DDC5',
  blue: '#A7C6DA',
  pink: '#FAD7E5',
  black: '#1D1D1F',
  white: '#FFFFFF',
  green: '#5DBB63',
  yellow: '#FFE681',
  purple: '#A699D9',
  coral: '#FA7268',
  silver: '#E4E4E2',
  rosegold: '#FAD7BD',
  midnight: '#1D1D1F',
  sierrablue: '#A3BCD4',
  graphite: '#52514D',
  midnightgreen: '#4E5851',
  spacegray: '#535150',
  spaceblack: '#25212B',
  skyblue: '#5EB0E5',
  starlight: '#FAF6F2',
};

export const ProductOverview: React.FC<Props> = ({
  selectedProduct,
  mainImage,
  cartProducts,
  favouritesProducts,
  handleImageClick,
  handleColorClick,
  handleCapacityClick,
  handleCartClick,
  handleFavouritesClick,
}) => {
  const products = useSelector((state: RootState) => state.products.items);

  const formattedId = useMemo(() => {
    if (!selectedProduct) {
      return '000000';
    }

    const foundProduct = products.find(p => p.itemId === selectedProduct.id);

    return foundProduct ? String(foundProduct.id).padStart(6, '0') : '000000';
  }, [products, selectedProduct]);

  if (!selectedProduct) {
    return null;
  }

  const isAddedToCart = cartProducts.some(
    p => (p.itemId || p.id) === selectedProduct.id,
  );

  const isFavourite = favouritesProducts.some(
    p => (p.itemId || p.id) === selectedProduct.id,
  );

  const shortSpecs = [
    {
      label: 'Screen',
      value: selectedProduct.screen.split(' ').slice(0, 2).join(' '),
    },
    { label: 'Resolution', value: selectedProduct.resolution },
    { label: 'Processor', value: selectedProduct.processor },
    { label: 'RAM', value: selectedProduct.ram },
  ];

  return (
    <div className={styles.overview}>
      <h2 className={styles.overview_title}>{selectedProduct.name}</h2>
      <div className={styles.overview_container}>
        <div className={styles.overview_imagesContainer}>
          <div className={styles.overview_imagesContainer_block}>
            {selectedProduct.images.map((image, index) => (
              <img
                key={index}
                src={image}
                onClick={() => handleImageClick(image)}
                className={classNames(
                  styles.overview_imagesContainer_block_imgs,
                  {
                    [styles.overview_imagesContainer_block_imgs_black]:
                      image === mainImage,
                  },
                )}
                alt="Thumbnail"
                onError={event =>
                  event.currentTarget.setAttribute('style', 'display: none;')
                }
              />
            ))}
          </div>
          <img
            src={mainImage}
            className={styles.overview_imagesContainer_img}
            alt={selectedProduct.name}
          />
        </div>
        <div className={styles.overview_optionsContainer}>
          <div className={styles.overview_colorsIdBlock}>
            <p className={styles.overview_text_id}>ID: {formattedId}</p>
            <div className={styles.overview_colorsIdBlock_colors}>
              <p className={styles.overview_text}>Available colors</p>
              <ul className={styles.overview_colors}>
                {selectedProduct.colorsAvailable.map((color, index) => (
                  <li
                    key={index}
                    className={classNames(styles.overview_colors_item, {
                      [styles.overview_colors_black]:
                        selectedProduct.color === color,
                    })}
                  >
                    <button
                      type="button"
                      onClick={() => handleColorClick(color)}
                      className={styles.overview_colors_link}
                      style={{
                        backgroundColor: appleColorMap[color],
                      }}
                    ></button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.overview_capacityContainer}>
            <p className={styles.overview_text}>Select capacity</p>
            <ul className={styles.overview_capacity}>
              {selectedProduct.capacityAvailable.map((capacity, index) => (
                <li key={index} className={styles.overview_capacity_item}>
                  <button
                    type="button"
                    onClick={() => handleCapacityClick(capacity)}
                    className={classNames(styles.overview_capacity_link, {
                      [styles.overview_capacity_black]:
                        selectedProduct.capacity === capacity,
                    })}
                  >
                    {capacity}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.overview_buttonsPricesContainer}>
            <div className={styles.overview_prices}>
              <p className={styles.overview_prices_priceFull}>
                ${selectedProduct.priceDiscount}
              </p>
            </div>

            <div className={styles.overview_buttons}>
              <button
                type="button"
                className={classNames(styles.overview_buttons_add, {
                  [styles.overview_buttons_add_added]: isAddedToCart,
                })}
                onClick={handleCartClick}
              >
                {isAddedToCart ? 'Added to cart' : 'Add to cart'}
              </button>
              <button
                type="button"
                className={styles.overview_buttons_favourites}
                onClick={handleFavouritesClick}
              >
                <span
                  className={classNames({
                    [styles.overview_buttons_favourites_heartIconFull]:
                      isFavourite,
                    [styles.overview_buttons_favourites_heartIcon]:
                      !isFavourite,
                  })}
                ></span>
              </button>
            </div>
          </div>

          <div className={styles.overview_descriptionContainer}>
            {shortSpecs.map(spec => (
              <div key={spec.label} className={styles.overview_row}>
                <p className={styles.overview_text}>{spec.label}</p>
                <p className={styles.overview_text_value}>{spec.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
