import styles from './Feature.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProductInfo } from '../../../../../type/ProductInfo';
import { colorMap } from '../../../../../utils/ColorsMap/ColorMap';
import { Color } from '../../../../../type/Color';
import { Buttons } from '../../../../shared/Buttons/Buttons';
import classNames from 'classnames';
import { GlobalContext } from '../../../../shared/GlobalContext/GlobalContext';
import { useContext } from 'react';

type Props = {
  currentCard: ProductInfo | null;
};

export const Feature: React.FC<Props> = ({ currentCard }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isSunSelected, products } = useContext(GlobalContext);

  const isLikedCard = products.find(
    product => product.itemId === currentCard?.id,
  );

  // const isAccessory = currentCard?.category === 'accessories';

  const currentPath = location.pathname;
  const currentColor = currentPath.split('-').slice(-1)[0];
  const currentGbMatch = currentPath.match(/(\d+)(GB|TB)/i);
  const currentMmMatch = currentPath.match(/(\d+)(mm)/i);

  let currentGb: string;
  let currentMm: string;

  if (currentGbMatch) {
    const size = currentGbMatch[1];
    const unit = currentGbMatch[2].toUpperCase();

    currentGb = `${size}${unit}`;
  } else if (currentMmMatch) {
    const size = currentMmMatch[1];

    currentMm = `${size}mm`;
  } else {
    currentGb = '1TB';
    currentMm = '40mm';
  }

  const replaceColorInPath = (newColor: string) => {
    const pathParts = currentPath.split('-');

    pathParts[pathParts.length - 1] = newColor;
    const newPath = pathParts.join('-');

    navigate(newPath);
  };

  const replaceCapacityInPath = (newCapacity: string) => {
    const pathParts = currentPath.split('-');

    pathParts[pathParts.length - 2] = newCapacity.toLowerCase();
    const newPath = pathParts.join('-');

    navigate(newPath);
  };

  const discription = [
    { title: 'Screen', info: currentCard?.screen },
    { title: 'Resolution', info: currentCard?.resolution },
    { title: 'Processor', info: currentCard?.processor },
    { title: 'RAM', info: currentCard?.ram },
  ];

  return (
    <div className={styles.feature}>
      <div className={styles.feature__box}>
        <div
          className={classNames(styles.feature__box_colors, {
            [styles.feature__box_colors_dark]: !isSunSelected,
          })}
        >
          <div className={styles.feature__box_colors_block}>
            <p className={styles.feature__box_colors_title}>Available colors</p>
            <p className={styles.feature__box_colors_id}>ID: 000000</p>
          </div>
          <div className={styles.feature__box_colors_list}>
            {currentCard?.colorsAvailable.map(color => (
              // eslint-disable-next-line react/jsx-key
              <div
                className={classNames(styles.feature__box_colors_item, {
                  [styles.feature__box_colors_item_active]:
                    color === currentColor,
                  [styles.feature__box_colors_item_dark]: !isSunSelected,
                  [styles.feature__box_colors_item_dark_active]:
                    !isSunSelected && color === currentColor,
                })}
              >
                <button
                  key={color}
                  className={styles.feature__box_colors_link}
                  style={{ backgroundColor: colorMap[color as Color] }}
                  onClick={() => replaceColorInPath(color)}
                ></button>
              </div>
            ))}
          </div>
        </div>

        <div
          className={classNames(styles.feature__box_capacity, {
            [styles.feature__box_capacity_dark]: !isSunSelected,
          })}
        >
          <p className={styles.feature__box_capacity_title}>Select capacity</p>
          <div className={styles.feature__box_capacity_list}>
            {currentCard?.capacityAvailable.map(gb => (
              <button
                key={gb}
                className={classNames(styles.feature__box_capacity_link, {
                  [styles.feature__box_capacity_link_active]:
                    gb === currentGb || gb === currentMm,
                  [styles.feature__box_capacity_link_dark]: !isSunSelected,
                  [styles.feature__box_capacity_link_dark_active]:
                    (!isSunSelected && gb === currentGb) ||
                    (!isSunSelected && gb === currentMm),
                })}
                onClick={() => replaceCapacityInPath(gb)}
              >
                {`${gb.slice(0, -2)} ${gb.slice(-2)}`}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.feature__box_price}>
          <p
            className={classNames(styles.feature__box_price_discount, {
              [styles.feature__box_price_discount_dark]: !isSunSelected,
            })}
          >
            {`${currentCard?.priceDiscount}$`}
          </p>
          <p className={styles.feature__box_price_regular}>
            {`${currentCard?.priceRegular}$`}
          </p>
        </div>

        <div className={styles.feature__box_button}>
          {isLikedCard && <Buttons product={isLikedCard} />}
        </div>

        <div className={styles.feature__box_info}>
          {discription.map(expo => (
            // eslint-disable-next-line react/jsx-key
            <div className={styles.feature__box_info_block}>
              <p className={styles.feature__box_info_block_title}>
                {expo.title}
              </p>
              <span
                className={classNames(styles.feature__box_info_block_result, {
                  [styles.feature__box_info_block_result_dark]: !isSunSelected,
                })}
              >
                {expo.info}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
