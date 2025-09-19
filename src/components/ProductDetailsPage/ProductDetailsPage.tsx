import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from './ProductDetailsPage.module.scss';
import { usePhones } from '../../contexts/PhonesContext';
import { Item } from '../../types/Item';
import { useEffect, useState } from 'react';
import { AppleColor } from '../../types/Color';
import { ProductControls } from '../ProductControls/ProductControls';
import { useTablets } from '../../contexts/TabletsContext';
import { useAccessories } from '../../contexts/AccessoriesContext';
import { YouMayAlsoLike } from '../YouMayAlsoLike/YouMayAlsoLike';
import { Breadcrumbs } from '../Breadcrumbs';
import { useTheme } from '../../contexts/ThemeContext';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useTranslation } from 'react-i18next';

type Props = {
  category: string;
};

export const ProductDetailsPage: React.FC<Props> = ({ category }) => {
  const { phones } = usePhones();
  const { tablets } = useTablets();
  const { accessories } = useAccessories();
  const { productId } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentColor, setCurrentColor] = useState('');
  const [currentCapacity, setCurrentCapacity] = useState('');
  const [product, setProduct] = useState<Item | undefined>();
  const { theme } = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    let foundProduct: Item | undefined;

    if (category === 'phones') {
      foundProduct = phones.find(x => x.id === productId);
    } else if (category === 'tablets') {
      foundProduct = tablets.find(x => x.id === productId);
    } else if (category === 'accessories') {
      foundProduct = accessories.find(x => x.id === productId);
    }

    if (!foundProduct) {
      return;
    }

    setCurrentColor(foundProduct.color as string);
    setCurrentCapacity(foundProduct.capacity as string);

    let elems: Item[] = [];

    if (category === 'phones') {
      elems = phones.filter(x => x.namespaceId === foundProduct.namespaceId);
    } else if (category === 'tablets') {
      elems = tablets.filter(x => x.namespaceId === foundProduct.namespaceId);
    } else if (category === 'accessories') {
      // eslint-disable-next-line max-len
      elems = accessories.filter(x => x.namespaceId === foundProduct.namespaceId);
    }

    // eslint-disable-next-line max-len
    const variation = elems.find(x => x.color === currentColor && x.capacity === currentCapacity);

    if (variation) {
      foundProduct = variation;
      navigate(`/${category}/${variation.id}`, { replace: true });
    }

    setProduct(foundProduct);
    setCurrentColor(foundProduct.color as string);
    setCurrentCapacity(foundProduct.capacity as string);

    window.scrollTo({ top: 0, behavior: 'smooth' });
    // eslint-disable-next-line max-len
  }, [productId, category, currentColor, currentCapacity, phones, tablets, accessories, navigate]);

  const handleImageSelection = (index: number) => {
    setCurrentIndex(index);
  };

  const handleColorSelection = (color: string) => {
    setCurrentColor(color);
  };

  const handleCapacitySelection = (capacity: string) => {
    setCurrentCapacity(capacity);
  };

  const colorMap: Record<AppleColor, string> = {
    gold: '#F8E5C7',
    midnightgreen: '#4E5851',
    spacegray: '#323542',
    silver: '#F1F2F9',
    red: '#FF3B30',
    green: '#34C759',
    yellow: '#FFD60A',
    purple: '#BF5AF2',
    white: '#FFFFFF',
    black: '#000000',
    pink: '#FF9F9F',
    starlight: '#F5F2EB',
    midnight: '#1E2023',
    blue: '#007AFF',
    deepPurple: '#5E5CE6',
    graphite: '#4B4B4B',
    roseGold: '#B76E79',
    spaceBlack: '#1C1C1E',
    naturalTitanium: '#C0B8AE',
    blueTitanium: '#4E6B8A',
    whiteTitanium: '#F8F9F9',
    orange: '#FF9500',
    clay: '#CBB8A9',
    coral: '#FF6B6B',
    stormBlue: '#475569',
    guava: '#FF7F8C',
  };

  const images = product?.images as string[];
  const colors = product?.colorsAvailable as string[];
  const capacity = product?.capacityAvailable as string[];

  return (
    <section className={styles.productDetailsPage}>
      <div className={styles.productDetailsPage__content}>
        <Breadcrumbs product={product} category={category} />

        <Link
          to=".."
          relative="path"
          className={`${styles.productDetailsPage__linkBack} ${theme === 'light' && styles['productDetailsPage__linkBack--lightTheme']}`}
        >
          {t('elements.back')}
        </Link>
        <h1 className={styles.productDetailsPage__title}>{product?.name}</h1>

        {product ? (
          images &&
          colors && (
            <div className={styles.productDetailsPage__product}>
              <div className={styles.productDetailsPage__photos}>
                <div className={styles.productDetailsPage__mainPhotoBox}>
                  <img
                    src={`${images[currentIndex]}`}
                    alt="Product photo"
                    className={styles.productDetailsPage__mainPhoto}
                  />
                </div>
                <div className={styles.productDetailsPage__photoList}>
                  {images?.map((image, index) => (
                    <a
                      key={index}
                      className={`${styles.productDetailsPage__photoLink} ${index === currentIndex && styles['productDetailsPage__photoLink--active']}`}
                    >
                      <img
                        src={`${image}`}
                        alt={(index + 1).toString()}
                        className={`${styles.productDetailsPage__photo} ${theme === 'light' && styles['productDetailsPage__photo--lightTheme']}`}
                        onClick={() => handleImageSelection(index)}
                      />
                    </a>
                  ))}
                </div>
              </div>
              <div
                className={`${styles.productDetailsPage__details} ${styles['productDetailsPage__details--colors']}`}
              >
                <div className={styles.productDetailsPage__detailsHead}>
                  <h3 className={styles.productDetailsPage__detailsTitle}>
                    {t('elements.colors')}
                  </h3>
                  <p className={styles.productDetailsPage__detailsId}>ID: 802390</p>
                </div>
                <div className={styles.productDetailsPage__detailsList}>
                  {colors.map((color, index) => (
                    <div
                      className={`${styles.productDetailsPage__detail} ${styles['productDetailsPage__detail--color']} ${color === currentColor && styles['productDetailsPage__detail--colorActive']}`}
                      key={index}
                      style={{ backgroundColor: colorMap[color as AppleColor] }}
                      onClick={() => handleColorSelection(color)}
                    ></div>
                  ))}
                </div>
              </div>
              <div className={styles.productDetailsPage__details}>
                <div
                  className={`${styles.productDetailsPage__detailsHead} ${styles['productDetailsPage__detailsHead--capacity']}`}
                >
                  <h3 className={`${styles.productDetailsPage__detailsTitle}}`}>
                    {t('elements.capacity')}
                  </h3>
                </div>
                <div className={`${styles.productDetailsPage__detailsList}`}>
                  {capacity.map((x, index) => (
                    <div
                      className={`${styles.productDetailsPage__detail} ${styles['productDetailsPage__detail--capacity']} ${theme === 'light' && styles['productDetailsPage__detail--capacity-lightTheme']} ${x === currentCapacity && styles['productDetailsPage__detail--capacityActive']}`}
                      key={index}
                      onClick={() => handleCapacitySelection(x)}
                    >
                      {x}
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.productDetailsPage__addToCart}>
                <div className={styles.productDetailsPage__price}>
                  <p className={styles.productDetailsPage__priceDiscount}>
                    ${product?.priceDiscount}
                  </p>{' '}
                  <p className={styles.productDetailsPage__priceFull}>${product?.priceRegular}</p>
                </div>
                <ProductControls product={product as Item} isDetails={true} isYouMayLike={false} />
              </div>
              <ul
                className={`${styles.productDetailsPage__featuresList} ${styles['productDetailsPage__featuresList--details']}`}
              >
                <li className={styles.productDetailsPage__featuresItem}>
                  <span className={styles.productDetailsPage__featuresTitle}>
                    {t('titles.screen')}
                  </span>
                  <span className={styles.productDetailsPage__featuresValue}>
                    {product?.screen}
                  </span>
                </li>
                <li className={styles.productDetailsPage__featuresItem}>
                  <span className={styles.productDetailsPage__featuresTitle}>
                    {t('titles.resolution')}
                  </span>
                  <span className={styles.productDetailsPage__featuresValue}>
                    {product?.resolution}
                  </span>
                </li>
                <li className={styles.productDetailsPage__featuresItem}>
                  <span className={styles.productDetailsPage__featuresTitle}>
                    {t('titles.processor')}
                  </span>
                  <span className={styles.productDetailsPage__featuresValue}>
                    {product?.processor}
                  </span>
                </li>
                <li className={styles.productDetailsPage__featuresItem}>
                  <span className={styles.productDetailsPage__featuresTitle}>
                    {t('titles.ram')}
                  </span>
                  <span className={styles.productDetailsPage__featuresValue}>{product?.ram}</span>
                </li>
              </ul>
              <article
                className={`${styles.productDetailsPage__article} ${styles['productDetailsPage__article--about']}`}
              >
                <h3 className={styles.productDetailsPage__articleTitle}>{t('titles.about')}</h3>
                <div className={styles.productDetailsPage__aboutDescriptions}>
                  {product?.description.map((x, id) => (
                    <div className={styles.productDetailsPage__aboutDescription} key={id}>
                      <h4 className={styles.productDetailsPage__aboutDescriptionTitle}>
                        {x.title}
                      </h4>
                      <p className={styles.productDetailsPage__aboutDescriptionText}>{x.text}</p>
                    </div>
                  ))}
                </div>
              </article>
              <article
                className={`${styles.productDetailsPage__article} ${styles['productDetailsPage__article--techSpecs']}`}
              >
                <h3 className={styles.productDetailsPage__articleTitle}>{t('titles.techSpecs')}</h3>
                <ul
                  className={`${styles.productDetailsPage__featuresList} ${styles['productDetailsPage__featuresList--techSpecs']}`}
                >
                  <li className={styles.productDetailsPage__featuresItem}>
                    <span className={styles.productDetailsPage__featuresTitle}>
                      {t('titles.screen')}
                    </span>
                    <span className={styles.productDetailsPage__featuresValue}>
                      {product?.screen}
                    </span>
                  </li>
                  <li className={styles.productDetailsPage__featuresItem}>
                    <span className={styles.productDetailsPage__featuresTitle}>
                      {t('titles.resolution')}
                    </span>
                    <span className={styles.productDetailsPage__featuresValue}>
                      {product?.resolution}
                    </span>
                  </li>
                  <li className={styles.productDetailsPage__featuresItem}>
                    <span className={styles.productDetailsPage__featuresTitle}>
                      {t('titles.processor')}
                    </span>
                    <span className={styles.productDetailsPage__featuresValue}>
                      {product?.processor}
                    </span>
                  </li>
                  <li className={styles.productDetailsPage__featuresItem}>
                    <span className={styles.productDetailsPage__featuresTitle}>
                      {t('titles.ram')}
                    </span>
                    <span className={styles.productDetailsPage__featuresValue}>{product?.ram}</span>
                  </li>
                  <li className={styles.productDetailsPage__featuresItem}>
                    <span className={styles.productDetailsPage__featuresTitle}>
                      {t('titles.cell')}
                    </span>
                    <span className={styles.productDetailsPage__featuresValue}>
                      {product?.cell.join(', ')}
                    </span>
                  </li>
                </ul>
              </article>
            </div>
          )
        ) : (
          <h2 className={styles.productDetailsPage__notFound}> {t('errors.productNotFound')}</h2>
        )}
      </div>

      <YouMayAlsoLike />
    </section>
  );
};
