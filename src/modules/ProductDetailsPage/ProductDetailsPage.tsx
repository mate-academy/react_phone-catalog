import classNames from 'classnames';
import { useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AddAndLikeButtons } from '../../components/AddAndLikeButtons';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Loader } from '../../components/Loader';
import { ProductImagesSlider } from '../../components/ProductImagesSlider';
import { ProductsSlider } from '../../components/ProductsSlider';
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

  const { products, phones, accessories, tablets, suggestedProducts, loading } =
    useProducts();
  const product = useMemo(() => {
    return products.find(p => productId && p.itemId === productId);
  }, [products, productId]);

  const productsByCategory = useMemo(() => {
    const category = product?.category;

    const categoryMap: { [key: string]: ProductDetails[] } = {
      phones,
      accessories,
      tablets,
    };

    return category ? categoryMap[category] : [];
  }, [phones, accessories, tablets, product]);

  if (!productId && !loading) {
    return (
      <div className={classNames(styles.product, styles['product--error'])}>
        <h2
          className={classNames(
            styles.product__title,
            styles['product__title--error'],
          )}
        >
          Product not found
        </h2>
        <img
          className={styles.product__img}
          src="public/img/product-not-found.webp"
          alt="product not found"
        />
      </div>
    );
  }

  const productDetails = productsByCategory.find(p => p.id === productId) as
    | Product
    | undefined;

  if (!productDetails) {
    return loading ? (
      <div className={styles.product__loader}>
        <Loader />
      </div>
    ) : (
      <div className={classNames(styles.product, styles['product--error'])}>
        <h2
          className={classNames(
            styles.product__title,
            styles['product__title--error'],
          )}
        >
          Product not found
        </h2>
        <img
          className={styles.product__img}
          src="public/img/product-not-found.webp"
          alt="product not found"
        />
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
    resolution,
    cell,
  }: Product = productDetails;

  let camera: string | undefined;
  let zoom: string | undefined;

  if ('camera' in productDetails) {
    camera = productDetails.camera;
    zoom = productDetails.zoom;
  }

  const specs = [
    { name: 'Screen', value: screen },
    { name: 'Resolution', value: resolution },
    { name: 'Processor', value: processor },
    { name: 'RAM', value: ram },
    { name: 'Built in memory', value: capacity },
    { name: 'Camera', value: camera },
    { name: 'Zoom', value: zoom },
    { name: 'Cell', value: cell },
  ];

  const handleNavigateChange = (
    checkedColor?: string,
    checkedCapacity?: string,
  ) => {
    const currentColor = checkedColor || color;
    const currentCapacity = checkedCapacity || capacity;

    const navigateColor =
      currentColor === currentColor.replace(' ', '-')
        ? currentColor
        : currentColor.replace(' ', '-');

    navigate(
      `/product/${namespaceId}-${currentCapacity.toLowerCase()}-${navigateColor}`,
    );
  };

  return (
    <div className={styles.product}>
      <Breadcrumbs category={category} />
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.product__content}>
          <div className={classNames(styles.product__header, styles.header)}>
            <Link to={`/${category}`} className={styles.header__link}>
              <div className={styles.header__icon}></div>
              <p className={styles.header__text}>Back</p>
            </Link>
            <h2 className={styles.product__title}>{name}</h2>
          </div>

          <div className={styles.product__slider}>
            <ProductImagesSlider images={images} />
          </div>

          <div className={styles.product__info}>
            <div
              className={classNames(styles.product__selects, styles.selects)}
            >
              <div className={styles.selects__select}>
                <p className={styles['selects__small-text']}>
                  Available colors
                </p>
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
                        className={classNames(
                          styles['selects__capacity-label'],
                          {
                            [styles['selects__capacity-label--checked']]:
                              capacity === availableCapacity,
                          },
                        )}
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
              {product && <AddAndLikeButtons product={product} />}
            </div>
            <div className={styles.product__specs}>
              {specs.slice(0, 4).map((spec, i) => (
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

          <div className={classNames(styles.product__about, styles.about)}>
            <h3 className={styles.product__subtitle}>About</h3>
            <div className={styles.about__paragraph}>
              <h4 className={styles.about__subtitle}>And then there was Pro</h4>
              <p className={styles.about__text}>
                A transformative triple‑camera system that adds tons of
                capability without complexity.
                <br />
                <br />
                An unprecedented leap in battery life. And a mind‑blowing chip
                that doubles down on machine learning and pushes the boundaries
                of what a smartphone can do. Welcome to the first iPhone
                powerful enough to be called Pro.
              </p>
            </div>
            <div className={styles.about__paragraph}>
              <h4 className={styles.about__subtitle}>Camera</h4>
              <p className={styles.about__text}>
                Meet the first triple‑camera system to combine cutting‑edge
                technology with the legendary simplicity of iPhone. Capture up
                to four times more scene. Get beautiful images in drastically
                lower light. Shoot the highest‑quality video in a smartphone —
                then edit with the same tools you love for photos. You’ve never
                shot with anything like it.
              </p>
            </div>
            <div className={styles.about__paragraph}>
              <h4 className={styles.about__subtitle}>
                Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it.
                Love it.
              </h4>
              <p className={styles.about__text}>
                iPhone 11 Pro lets you capture videos that are beautifully true
                to life, with greater detail and smoother motion. Epic
                processing power means it can shoot 4K video with extended
                dynamic range and cinematic video stabilization — all at 60 fps.
                You get more creative control, too, with four times more scene
                and powerful new editing tools to play with.
              </p>
            </div>
          </div>

          <div className={styles['product__tech-specs']}>
            <h3 className={styles.product__subtitle}>Tech specs</h3>
            <div
              className={classNames(
                styles.product__specs,
                styles['product__specs--tech'],
              )}
            >
              {specs.map((spec, i) => (
                <div
                  key={i}
                  className={classNames(styles.product__spec, styles.spec)}
                >
                  <p
                    className={classNames(
                      styles.spec__name,
                      styles['spec-name--tech'],
                    )}
                  >
                    {spec.name}
                  </p>
                  <p
                    className={classNames(
                      styles.spec__value,
                      styles['spec-value--tech'],
                    )}
                  >
                    {spec.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.product__suggested}>
            <ProductsSlider
              products={suggestedProducts}
              title={'You may also like'}
              hot={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};
