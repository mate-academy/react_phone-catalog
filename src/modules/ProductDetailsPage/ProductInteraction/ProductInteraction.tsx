/* eslint-disable jsx-a11y/label-has-associated-control */
import { DeviceDetails } from '../../types';
import styles from './ProductInteraction.module.scss';
import { useCart } from '../../CartProvider/CartProvider';
import { useFavorites } from '../../FavoritesProvider/FavoritesProvider';
import { useLanguage } from '../../../contexts/LanguageContext';

import globalStyles from '../../../styles/index.module.scss';
import { HeartButton } from '../../shared/HeartButton';
import { AddToCartButton } from '../../shared/AddToCartButton';
import { useSomeCrazyMove } from '../../hooks/utilHooks';

interface ProductInteractionProps {
  deviceDetails: DeviceDetails;
  onColorChange: (color: string) => void;
  onCapacityChange: (capacity: string) => void;
}

export const ProductInteraction: React.FC<ProductInteractionProps> = ({
  deviceDetails,
  onColorChange,
  onCapacityChange,
}) => {
  const handleColorSelect = (color: string) => {
    onColorChange(color);
  };

  const handleCapacitySelect = (capacity: string) => {
    onCapacityChange(capacity);
  };

  const { toggleFavorites } = useFavorites();
  const { isInFavorites } = useFavorites();
  const { toggleCartItem } = useCart();

  const { t } = useLanguage();
  const inFavorites = isInFavorites(deviceDetails.id);

  const d = {
    id: deviceDetails.id,
    name: deviceDetails.name,
    image: deviceDetails.images[0],
    color: deviceDetails.color,
    capacity: deviceDetails.capacity,
    category: deviceDetails.category,
    price: deviceDetails.priceDiscount,
    quantity: 1,
  };

  // Crazy technical dept
  const thatIsCrazySolution = useSomeCrazyMove(d.id);

  const handleAddToCart = () => {
    toggleCartItem(d);
  };

  const handleAddToFavorites = () => {
    toggleFavorites({
      id: deviceDetails.id,
      name: deviceDetails.name,
      fullPrice: deviceDetails.priceRegular,
      price: deviceDetails.priceDiscount,
      screen: deviceDetails.screen,
      capacity: deviceDetails.capacity,
      color: deviceDetails.color,
      ram: deviceDetails.ram,
      image: deviceDetails.images?.[0],
    });
  };

  return (
    <div className={styles.interactionContainer}>
      <div className={styles.productInteraction__Forms}>
        <form className={styles.formStyle__Container}>
          <h5 className={styles.formStyle__Title}>
            {t('product.availableColors')}
          </h5>
          <div className={styles.formList}>
            {deviceDetails.colorsAvailable.map((color, index) => (
              <label className={styles.colorWrapper} key={color}>
                <input
                  type="radio"
                  name="color"
                  checked={
                    index ===
                    deviceDetails.colorsAvailable.indexOf(deviceDetails.color)
                  }
                  onChange={() => {
                    handleColorSelect(color);
                  }}
                />
                <span
                  className={styles.colorButton}
                  style={{ backgroundColor: color }}
                />
              </label>
            ))}
          </div>
        </form>
        <form className={styles.formStyle__Container}>
          <h5 className={styles.formStyle__Title}>
            {t('product.selectCapacity')}
          </h5>

          <div className={styles.formList}>
            {deviceDetails.capacityAvailable.map((capacity, index) => (
              <label className={styles.capacityWrapper} key={capacity}>
                <input
                  type="radio"
                  name="capacity"
                  checked={
                    index ===
                    deviceDetails.capacityAvailable.indexOf(
                      deviceDetails.capacity,
                    )
                  }
                  onChange={() => handleCapacitySelect(capacity)}
                />
                <span className={styles.capacityButton}>{capacity}</span>
              </label>
            ))}
          </div>
        </form>
      </div>
      <div className={styles.bottomContainer}>
        <div className={styles.priceContainer}>
          {thatIsCrazySolution?.year === 2022 ? (
            <h2>${deviceDetails.priceRegular}</h2>
          ) : (
            <>
              <h2>${deviceDetails.priceDiscount}</h2>
              <h3>${deviceDetails.priceRegular}</h3>
            </>
          )}
        </div>
        <div className={styles.buttonsContainer}>
          <AddToCartButton onClick={handleAddToCart} device={d} />
          <button
            onClick={handleAddToFavorites}
            className={`${globalStyles.btnFavorites} ${styles.favoritesButton}`}
          >
            <HeartButton inFavorites={inFavorites} />
          </button>
        </div>
        <ul className={styles.specsList}>
          {Object.entries({
            Screen: deviceDetails.screen,
            Resolution: deviceDetails.resolution,
            Processor: deviceDetails.processor,
            Ram: deviceDetails.ram,
          }).map(([key, value]) => (
            <li className={styles.specsList__Item} key={key}>
              <p className={styles.specsList__ItemKey}>{key}</p>
              <p className={styles.specsList__ItemValue}>{value}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
