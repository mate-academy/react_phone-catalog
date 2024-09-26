import { ProductTypeExtended } from '../../api/type/ProductTypeExtended';
import { BackButton } from '../BackButton/BackButton';
import styles from './ItemDescription.module.scss';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import Heart from '../../assets/icons/card_icons/heart_icon.svg';
import FilledHeart from '../../assets/icons/card_icons/filled_heart_icon.svg';
import { Product } from '../../api/type/ProductCart';
import { Link, useLocation, useParams } from 'react-router-dom';
import { FavoritesContext } from '../../context/FavoritesContext';
import { RoutesPathes } from '../../utils/RoutesPathes';
import classNames from 'classnames';
import { RecommendedItemsSlider } from '../RecommendedItemsSlider/RecommendedItemsSlider';
import { CartContext } from '../../context/CartContextType';
import { COLOR_PALLETE } from '../../utils/Colors';
import { useTranslation } from 'react-i18next';

type Props = {
  phone: ProductTypeExtended;
  selectedColor: string;
  selectedButton: string;
  selectedImg: string;
  setSelectedColor: (value: string) => void;
  setSelectedButton: (value: string) => void;
  setSelectedImg: (value: string) => void;
  recommendedPhones: Product[];
};

export const ItemDescription: React.FC<Props> = ({
  phone,
  selectedColor,
  selectedButton,
  selectedImg,
  setSelectedColor,
  setSelectedButton,
  setSelectedImg,
  recommendedPhones,
}) => {
  const favoritesContext = useContext(FavoritesContext);
  const cartContext = useContext(CartContext);

  if (!favoritesContext || !cartContext) {
    throw new Error('Contexts are not provided');
  }

  const { addToFavorites, favoriteProducts } = favoritesContext;
  const { addToCart, cartItems, removeFromCart } = cartContext;

  const [isHeartActive, setIsHeartActive] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const { phonesId } = useParams<{ phonesId: string }>();
  const { tabletsId } = useParams<{ tabletsId: string }>();
  const { accessoriesId } = useParams<{ accessoriesId: string }>();

  useEffect(() => {
    const heartState = favoriteProducts.some((p) => p.name === phone.name);
    setIsHeartActive(heartState);

    const isProductInCart = cartItems.some((item) => item.product.name === phone.name);
    setIsAdded(isProductInCart);
  }, [favoriteProducts, phone.name, cartItems]);

  const handleFavoriteClick = () => {
    const productToAdd: Product = {
      id: phone.id,
      category: phone.category,
      name: phone.name,
      fullPrice: phone.priceRegular,
      price: phone.priceDiscount,
      screen: phone.screen,
      capacity: phone.capacity,
      color: selectedColor,
      ram: phone.ram,
      image: selectedImg,
    };

    const isFavorite = favoriteProducts.some((p) => p.name === phone.name);

    if (isFavorite) {
      favoritesContext.setFavoriteProducts((prevFavorites) =>
        prevFavorites.filter((p) => p.name !== phone.name),
      );
    } else {
      addToFavorites(productToAdd);
    }

    setIsHeartActive(!isHeartActive);
  };

  const handleAddToCart = () => {
    const productToAdd: Product = {
      id: phone.id,
      category: phone.category,
      name: phone.name,
      fullPrice: phone.priceRegular,
      price: phone.priceDiscount,
      screen: phone.screen,
      capacity: phone.capacity,
      color: selectedColor,
      ram: phone.ram,
      image: selectedImg,
    };

    const existingItem = cartItems.find((item) => item.product.name === phone.name);

    if (existingItem) {
      removeFromCart(existingItem.product.id.toString());
      setIsAdded(false);
    } else {
      addToCart(productToAdd);
      setIsAdded(true);
    }
  };

  const { theme } = useContext(FavoritesContext);
  const location = useLocation();

  const root = location.pathname.split('/')[1];
  const { t } = useTranslation();

  const linkClassName = classNames(styles.pageName, {
    [styles.pageNameActive]: phonesId || tabletsId || accessoriesId,
    [styles.dark]: theme === 'dark',
  });

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
  };

  const handleButtonClick = (button: string) => {
    setSelectedButton(button);
  };

  const handleImgClick = (img: string) => {
    setSelectedImg(img);
  };

  const categoryToRouteMap: { [key: string]: string } = {
    phones: RoutesPathes.PHONES,
    accessories: RoutesPathes.ACCESSORIES,
    tablets: RoutesPathes.TABLETS,
  };

  return (
    <>
      <div className={styles.route}>
        <Link
          to={RoutesPathes.HOME}
          className={classNames(styles.home, {
            [styles.dark]: theme === 'dark',
          })}
        />
        <i className={styles.arrow}></i>
        <Link to={categoryToRouteMap[phone.category]} className={linkClassName}>
          {t(phone.category)}
        </Link>

        <>
          <i className={styles.arrow}></i>
          <p className={styles.pageName}>{phone.name}</p>
        </>
      </div>

      <BackButton />
      <h1
        key={phone.id}
        className={classNames(styles.main_text, {
          [styles.dark]: theme === 'dark',
        })}
      >
        {phone.name}
      </h1>
      <div className={styles.container}>
        <div className={styles.imgBlock}>
          <div className={styles.mainPicture}>
            <img className={styles.mainPicture_img} src={selectedImg} alt={phone.id} />
          </div>
          <div className={styles.miniPictures}>
            {phone.images.map((img) => (
              <div
                onClick={() => handleImgClick(img)}
                key={img}
                className={selectedImg === img ? styles.imgContainer_active : styles.imgContainer}
              >
                <img className={styles.miniPicture} src={img} alt={phone.id} />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.orderBlock}>
          <div className={styles.textAndId}>
            <h3 className={styles.text}>{t('colors')}</h3>
            <h3 className={styles.textId}>ID: 802390</h3>
          </div>
          <div className={styles.chooseColor}>
            {phone.colorsAvailable.map((color) => (
              <Link
                key={color}
                to={`/${root}/${phone.namespaceId}-${selectedButton.toLocaleLowerCase()}-${color}`}
              >
                <div
                  onClick={() => handleColorClick(color)}
                  style={{ backgroundColor: COLOR_PALLETE[color] }}
                  className={selectedColor === color ? styles.colorPick_active : styles.colorPick}
                ></div>
              </Link>
            ))}
          </div>
          <div className={styles.separator}></div>
          <div className={styles.capacityBlock}>
            <h3 className={styles.text}>{t('selectCapacity')}</h3>
            <div className={styles.chooseStorage}>
              {phone.capacityAvailable.map((capacity) => (
                <Link
                  key={capacity}
                  to={`/${root}/${phone.namespaceId}-${capacity.toLocaleLowerCase()}-${selectedColor}`}
                >
                  <button
                    onClick={() => handleButtonClick(capacity)}
                    className={
                      selectedButton === capacity ? styles.storageActive : styles.storageDefault
                    }
                  >
                    {capacity}
                  </button>
                </Link>
              ))}
            </div>
          </div>
          <div className={styles.separator}></div>
          <div className={styles.price}>
            <h3
              className={classNames(styles.priceRegular, {
                [styles.dark]: theme === 'dark',
              })}
            >
              ${phone.priceDiscount}
            </h3>
            <h3 className={styles.priceDiscount}>{phone.priceRegular}</h3>
          </div>
          <div className={styles.buttons}>
            <button
              className={`${styles.add} ${isAdded ? styles.added : ''}`}
              onClick={handleAddToCart}
            >
              {isAdded ? t('added') : t('addToCart')}
            </button>
            <button className={styles.heart} onClick={handleFavoriteClick}>
              {isHeartActive ? (
                <img src={FilledHeart} alt="Added to favorites" />
              ) : (
                <img src={Heart} alt="Add to favorites" />
              )}
            </button>
          </div>
          <div className={styles.specs}>
            <div className={styles.screen}>
              <p className={styles.left}>{t('screen')}</p>
              <p
                className={classNames(styles.right, {
                  [styles.dark]: theme === 'dark',
                })}
              >
                {phone.screen}
              </p>
            </div>
            <div className={styles.resolution}>
              <p className={styles.left}>{t('resolution')}</p>
              <p
                className={classNames(styles.right, {
                  [styles.dark]: theme === 'dark',
                })}
              >
                {phone.resolution}
              </p>
            </div>
            <div className={styles.processor}>
              <p className={styles.left}>{t('processor')}</p>
              <p
                className={classNames(styles.right, {
                  [styles.dark]: theme === 'dark',
                })}
              >
                {phone.processor}
              </p>
            </div>
            <div className={styles.ram}>
              <p className={styles.left}>{t('ram')}</p>
              <p
                className={classNames(styles.right, {
                  [styles.dark]: theme === 'dark',
                })}
              >
                {phone.ram}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.container_text}>
        <div className={styles.about}>
          <h3
            className={classNames(styles.bigText, {
              [styles.dark]: theme === 'dark',
            })}
          >
            {t('about')}
          </h3>
          <div className={styles.separator_text}></div>
          {phone.description.map((desc) => (
            <Fragment key={`${desc.title}-${desc.text}`}>
              <h3
                className={classNames(styles.mediumText, {
                  [styles.dark]: theme === 'dark',
                })}
              >
                {desc.title}
              </h3>
              <p className={styles.smallText}>{desc.text}</p>
            </Fragment>
          ))}
        </div>
        <div className={styles.techSpecs}>
          <h3
            className={classNames(styles.bigText, {
              [styles.dark]: theme === 'dark',
            })}
          >
            {t('techSpecs')}
          </h3>
          <div className={styles.separator_text}></div>
          <div className={styles.specs}>
            <div className={styles.techScreen}>
              <p className={styles.left_text}> {t('screen')}</p>
              <p
                className={classNames(styles.right_text, {
                  [styles.dark]: theme === 'dark',
                })}
              >
                {phone.screen}
              </p>
            </div>
            <div className={styles.techResolution}>
              <p className={styles.left_text}> {t('resolution')}</p>
              <p
                className={classNames(styles.right_text, {
                  [styles.dark]: theme === 'dark',
                })}
              >
                {phone.resolution}
              </p>
            </div>
            <div className={styles.techProcessor}>
              <p className={styles.left_text}> {t('processor')}</p>
              <p
                className={classNames(styles.right_text, {
                  [styles.dark]: theme === 'dark',
                })}
              >
                {phone.processor}
              </p>
            </div>
            <div className={styles.techRam}>
              <p className={styles.left_text}> {t('ram')}</p>
              <p
                className={classNames(styles.right_text, {
                  [styles.dark]: theme === 'dark',
                })}
              >
                {phone.ram}
              </p>
            </div>
            <div className={styles.techMemory}>
              <p className={styles.left_text}>{t('memory')}</p>
              <p
                className={classNames(styles.right_text, {
                  [styles.dark]: theme === 'dark',
                })}
              >
                {phone.capacity}
              </p>
            </div>

            <div className={styles.techCamera}>
              <p className={styles.left_text}>{t('camera')}</p>
              <p
                className={classNames(styles.right_text, {
                  [styles.dark]: theme === 'dark',
                })}
              >
                {phone.camera}
              </p>
            </div>

            <div className={styles.techZoom}>
              <p className={styles.left_text}>{t('zoom')}</p>
              <p
                className={classNames(styles.right_text, {
                  [styles.dark]: theme === 'dark',
                })}
              >
                {phone.zoom}
              </p>
            </div>
            <div className={styles.techCell}>
              <p className={styles.left_text}>{t('cell')}</p>
              <p
                className={classNames(styles.right_text, {
                  [styles.dark]: theme === 'dark',
                })}
              >
                {phone.cell.join(', ')}
              </p>
            </div>
          </div>
        </div>
      </div>
      <RecommendedItemsSlider recommendedPhones={recommendedPhones} />
    </>
  );
};
