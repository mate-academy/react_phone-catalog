import classNames from 'classnames';
import styles from './ShortInfo.module.scss';
import heartIcon from './icons/heart.svg';
import redHeartIcon from './icons/redHeart.svg';
import whiteHeart from './icons/whiteHeart.svg';
import { ProductInfo } from '../../../../types/ProductInfo';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../../../utils/AppContext';
import { getKnownColor } from '../../../../utils/helpers';

type Props = {
  product: ProductInfo;
};

function makeColorLink(id: string, color: string, targetColor: string) {
  return `/product/${id.replace(color.replaceAll(' ', '-'), targetColor.replaceAll(' ', '-'))}`;
}

export const ShortInfo: React.FC<Props> = ({ product }) => {
  const {
    name,
    id,
    priceRegular,
    priceDiscount,
    colorsAvailable,
    capacityAvailable,
    screen,
    capacity,
    ram,
    color,
    resolution,
  } = product;

  const { favorites, setFavorites, inCartItems, setInCartItems, isDarkTheme } =
    useContext(AppContext);

  const isInCart = inCartItems.includes(name);

  const addToCart = () => {
    if (isInCart) {
      return;
    }

    setInCartItems([...inCartItems, name]);
  };

  const isInFavorites = favorites.includes(id);

  const handleAddFavorite = () => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(item => item !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return (
    <div className={styles.shortInfo}>
      <div className={styles.availableColors}>
        <div
          className={classNames(
            styles.availableColors__text,
            isDarkTheme ? styles.availableColors__textDark : '',
          )}
        >
          Available colors
        </div>

        <div className={classNames(styles.availableColors__container)}>
          {colorsAvailable.map(currentColor => {
            return (
              <Link
                to={makeColorLink(id, color, currentColor)}
                className={classNames(
                  styles.availableColorOuter,
                  isDarkTheme ? styles.availableColorOuterDark : '',
                  currentColor === color ? styles.activeColor : '',
                  currentColor === color && isDarkTheme
                    ? styles.activeColorDark
                    : '',
                )}
                key={currentColor}
              >
                <div
                  className={classNames(
                    styles.availableColorInner,
                    isDarkTheme ? styles.availableColorInnerDark : '',
                  )}
                  style={{ backgroundColor: getKnownColor(currentColor) }}
                ></div>
              </Link>
            );
          })}
        </div>
      </div>

      <div
        className={classNames(styles.line, isDarkTheme ? styles.lineDark : '')}
      ></div>

      <div className={styles.capacity}>
        <div className={styles.capacity__text}>Select capacity</div>

        <div className={styles.capacity__options}>
          {capacityAvailable.map(volume => {
            return (
              <Link
                to={`/product/${id.replace(capacity.toLowerCase(), volume.toLowerCase())}`}
                className={classNames(
                  styles.capacity__option,
                  isDarkTheme ? styles.capacity__optionDark : '',
                  volume === capacity ? styles.capacity__activeOption : '',
                  volume === capacity && isDarkTheme
                    ? styles.capacity__activeOptionDark
                    : '',
                )}
                key={volume}
              >
                {volume}
              </Link>
            );
          })}
        </div>
      </div>

      <div
        className={classNames(styles.line, isDarkTheme ? styles.lineDark : '')}
      ></div>

      <div className={styles.shortInfo__details}>
        <div className={styles.price}>
          <div
            className={classNames(
              styles.price__new,
              isDarkTheme ? styles.price__newDark : '',
            )}
          >
            {priceDiscount}$
          </div>

          <div
            className={classNames(
              styles.price__old,
              isDarkTheme ? styles.price__oldDark : '',
            )}
          >
            {priceRegular}$
          </div>
        </div>

        <div className={styles.buttons}>
          <div
            className={classNames(
              styles.addButton,
              isDarkTheme ? styles.addButtonDark : '',
              isInCart ? styles.isInCart : '',
              isInCart && isDarkTheme ? styles.isInCartDark : '',
            )}
            onClick={addToCart}
          >
            <span>{isInCart ? 'Added to cart' : 'Add to cart'}</span>
          </div>
          <div
            className={classNames(
              styles.addFavoriteButton,
              isDarkTheme ? styles.addFavoriteButtonDark : '',
            )}
            style={
              isInFavorites
                ? { backgroundImage: `url(${redHeartIcon})` }
                : isDarkTheme
                  ? { backgroundImage: `url(${whiteHeart})` }
                  : { backgroundImage: `url(${heartIcon})` }
            }
            onClick={handleAddFavorite}
          ></div>
        </div>

        <div className={styles.infoBlock}>
          <div className={styles.infoBlockLine}>
            <span
              className={classNames(
                styles.infoLineTitle,
                isDarkTheme ? styles.infoLineTitleDark : '',
              )}
            >
              Screen
            </span>
            <span
              className={classNames(
                styles.infoLineText,
                isDarkTheme ? styles.infoLineTextDark : '',
              )}
            >
              {screen}
            </span>
          </div>
          <div className={styles.infoBlockLine}>
            <span
              className={classNames(
                styles.infoLineTitle,
                isDarkTheme ? styles.infoLineTitleDark : '',
              )}
            >
              Resolution
            </span>
            <span
              className={classNames(
                styles.infoLineText,
                isDarkTheme ? styles.infoLineTextDark : '',
              )}
            >
              {resolution}
            </span>
          </div>
          <div className={styles.infoBlockLine}>
            <span
              className={classNames(
                styles.infoLineTitle,
                isDarkTheme ? styles.infoLineTitleDark : '',
              )}
            >
              Capacity
            </span>
            <span
              className={classNames(
                styles.infoLineText,
                isDarkTheme ? styles.infoLineTextDark : '',
              )}
            >
              {capacity}
            </span>
          </div>
          <div className={styles.infoBlockLine}>
            <span
              className={classNames(
                styles.infoLineTitle,
                isDarkTheme ? styles.infoLineTitleDark : '',
              )}
            >
              RAM
            </span>
            <span
              className={classNames(
                styles.infoLineText,
                isDarkTheme ? styles.infoLineTextDark : '',
              )}
            >
              {ram}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
