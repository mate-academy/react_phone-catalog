import classNames from 'classnames';
import { useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductImagesSlider } from '../../components/ProductImagesSlider';
import { useProducts } from '../../store/ProductsContext';
import { Colors } from '../../types/Colors';
import {
  Accessory,
  Phone,
  ProductDetails,
  Tablet,
} from '../../types/ProductDetails';
import styles from './ProductDetailsPage.module.scss';

type Product = Phone | Tablet | Accessory;

export const ProductDetailsPage = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { products, phones, accessories, tablets } = useProducts();

  const productsByCategory = useMemo(() => {
    const category = products.find(
      product => productId && product.itemId === productId,
    )?.category;

    const categoryMap: { [key: string]: ProductDetails[] } = {
      phones,
      accessories,
      tablets,
    };

    return category ? categoryMap[category] : [];
  }, [phones, accessories, tablets, products, productId]);

  if (!productId) {
    return (
      <div className={styles.product}>
        <h2>Product not found</h2>
      </div>
    );
  }

  const productDetails = productsByCategory.find(
    product => product.id === productId,
  ) as Product | undefined;

  if (!productDetails) {
    return (
      <div className={styles.product}>
        <h2>Product not found</h2>
      </div>
    );
  }

  const {
    name,
    category,
    namespaceId,
    images,
    color,
    colorsAvailable,
    capacity,
    capacityAvailable,
    priceRegular,
    priceDiscount,
    screen,
    processor,
    ram,
  }: Product = productDetails;

  const specs = [
    { name: 'Screen', value: screen },
    { name: 'Сapacity', value: capacity },
    { name: 'Processor', value: processor },
    { name: 'RAM', value: ram },
  ];

  const handleNavigateChange = (
    checkedColor?: string,
    checkedCapacity?: string,
  ) => {
    let navigateColor = checkedColor || color;
    const navigateCapacity = checkedCapacity || capacity;

    navigateColor =
      navigateColor === navigateColor.replace(' ', '-')
        ? navigateColor
        : navigateColor.replace(' ', '-');

    return navigate(
      `/product/${namespaceId}-${navigateCapacity.toLowerCase()}-${navigateColor}`,
    );
  };

  return (
    <div className={styles.product}>
      <Breadcrumbs category={category} />
      <div className={styles.product__content}>
        <div className={classNames(styles.product__header, styles.header)}>
          <Link to={`/${category}`} className={styles.header__link}>
            <div className={styles.header__icon}></div>
            <p className={styles.header__text}>Back</p>
          </Link>
          <h2 className={styles.header__title}>{name}</h2>
        </div>
        {
          <div className={styles.product__left}>
            <div className={styles.product__slider}>
              <ProductImagesSlider images={images} />
            </div>
          </div>
        }

        <div className={styles.product__right}>
          <div className={classNames(styles.product__selects, styles.selects)}>
            <div className={styles.selects__select}>
              <p className={styles['selects__small-text']}>Available colors</p>
              <div className={styles.selects__options}>
                {colorsAvailable.map(availableColor => {
                  const colorKey = availableColor
                    .toUpperCase()
                    .replace(' ', '') as keyof typeof Colors;
                  const background = Colors[colorKey];

                  return (
                    <label
                      key={availableColor}
                      className={classNames(styles['selects__color-label'], {
                        [styles['selects__color-label--checked']]:
                          color === availableColor,
                      })}
                    >
                      <input
                        type="radio"
                        name="color"
                        className={styles['selects__color-input']}
                        value={availableColor}
                        checked={color === availableColor}
                        onChange={() =>
                          handleNavigateChange(availableColor, undefined)
                        }
                        style={{ display: 'none' }}
                      />
                      <div
                        className={styles.selects__color}
                        style={{ backgroundColor: background }}
                      ></div>
                      {''}
                    </label>
                  );
                })}
              </div>
            </div>
            <div className={styles.selects__select}>
              <p className={styles['selects__small-text']}>Select capacity</p>
              <div className={styles.selects__options}>
                {capacityAvailable.map(availableCapacity => {
                  return (
                    <label
                      key={availableCapacity}
                      className={classNames(styles['selects__capacity-label'], {
                        [styles['selects__capacity-label--checked']]:
                          capacity === availableCapacity,
                      })}
                    >
                      <input
                        type="radio"
                        name="capacity"
                        className={styles['selects__capacity-label']}
                        value={availableCapacity}
                        checked={color === availableCapacity}
                        onChange={() =>
                          handleNavigateChange(undefined, availableCapacity)
                        }
                        style={{ display: 'none' }}
                      />
                      <div
                        className={classNames(styles.selects__capacity, {
                          [styles['selects__capacity--checked']]:
                            capacity === availableCapacity,
                        })}
                      >
                        {availableCapacity}
                      </div>
                      {''}
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
          <div className={classNames(styles.product__actions)}>
            <div className={styles.product__price}>
              <p className={styles['product__price--discount']}>
                {'$' + priceDiscount}
              </p>
              <p className={styles['product__price--regular']}>
                {'$' + priceRegular}
              </p>
            </div>
            <div
              className={classNames(styles.product__buttons, styles.buttons)}
            >
              <button
                className={`${styles.buttons__button} ${styles['buttons__button--add']}`}
              >
                Add to cart
              </button>
              <button
                className={`${styles.buttons__button} ${styles['buttons__button--like']}`}
              ></button>
            </div>
          </div>
          <div className={styles.product__specs}>
            {specs.map((spec, i) => (
              <div
                key={i}
                className={classNames(styles.product__spec, styles.spec)}
              >
                <p className={styles.spec__name}>{spec.name}</p>
                <p className={styles.spec__value}>{spec.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
