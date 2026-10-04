import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import cn from 'classnames';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';

import { ProductDetails } from '@/shared/types/ProductDetails';
import container from '@/shared/styles/Container.module.scss';
import { Breadcrumbs } from '@/shared/components/Breadcrumbs';
import styles from './ProductCardDetails.module.scss';

import { getCapacityInGB } from '@/shared/utils/getCapacityInGB';
import { ProductInfo } from '@/shared/components/ProductInfo';
import { ProductsSlider } from '@/shared/components/ProductsSlider';
import { useProducts } from '@/shared/api/hooks/useProducts';
import { mapProductDetails } from '@/shared/utils/mapProductDetails';
import { useTranslation } from 'react-i18next';

type Props = {
  product: ProductDetails;
  sameModelProducts: ProductDetails[];
};

export const ProductCardDetails: React.FC<Props> = ({
  product,
  sameModelProducts,
}) => {
  const {
    name,
    category,
    images,
    priceRegular,
    priceDiscount,
    screen,
    capacity,
    ram,
    description,
  } = product;

  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useState(0);

  const swiperRef = useRef<SwiperType | null>(null);

  const title = name.replace(/\s\(\d{4}\)/, '');

  const BreadcrumbsTitle = `header.${category}`;

  const itemId = Math.floor(100000 + Math.random() * 900000);

  const sameModelAndCapacityProducts = sameModelProducts.filter(
    item => item.capacity === product.capacity,
  );

  const capacities = Array.from(
    new Set(sameModelProducts.map(item => item.capacity)),
  ).sort((a, b) => getCapacityInGB(b) - getCapacityInGB(a));

  const capacityLinks = capacities
    .map(capacityValue =>
      sameModelProducts.find(
        item => item.capacity === capacityValue && item.color === product.color,
      ),
    )
    .filter((item): item is ProductDetails => item !== undefined);

  const specs = [
    { key: 'Screen', value: product.screen },
    { key: 'Resolution', value: product.resolution },
    { key: 'Processor', value: product.processor },
    { key: 'RAM', value: product.ram },
    { key: 'Camera', value: product.camera },
    { key: 'Zoom', value: product.zoom },
    { key: 'Cell', value: product.cell?.join(', ') },
  ].filter(spec => spec.value);

  const { products: suggestedProducts } = useProducts(category);

  const { t } = useTranslation();

  return (
    <section className={styles.ProductCardDetails}>
      <div className={container.container}>
        <Breadcrumbs
          title={BreadcrumbsTitle}
          productName={title}
          category={category}
        />

        <div className={styles.ProductCardDetails__content}>
          <h2 className={styles.title}>{title}</h2>

          <div className={styles.item}>
            <div className={styles.left}>
              <Swiper
                loop
                modules={[Keyboard]}
                keyboard={{ enabled: true }}
                className={styles.mainImage}
                onSwiper={swiper => {
                  swiperRef.current = swiper;
                }}
                onSlideChange={swiper => {
                  setActiveIndex(swiper.realIndex);
                }}
              >
                {images.map(image => (
                  <SwiperSlide key={image}>
                    <img
                      className={styles.image}
                      src={`${image}`}
                      alt={title}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className={styles.pictures}>
                {images.map((image, index) => (
                  <div
                    key={image}
                    className={cn(styles.picture, {
                      [styles.activePicture]: index === activeIndex,
                    })}
                    onClick={() => {
                      swiperRef.current?.slideToLoop(index);
                    }}
                  >
                    <img
                      className={styles.img}
                      src={`${image}`}
                      alt="preview"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.right}>
              <div className={styles.options}>
                {/* COLORS */}
                <div className={styles.colorsBlock}>
                  <div className={styles.colors}>
                    <span className={styles.colorsText}>
                      {t('product.availableColors')}
                    </span>

                    <span className={styles.id}>ID: {itemId}</span>
                  </div>

                  <div className={styles.colorsOptions}>
                    {sameModelAndCapacityProducts.map(item => (
                      <label key={item.id} aria-label={item.color}>
                        <input
                          className={styles.radio}
                          type="radio"
                          name="color"
                          value={item.color}
                          checked={item.color === product.color}
                          onChange={() => navigate(`/product/${item.id}`)}
                        />

                        <span
                          className={cn(styles.color, {
                            [styles.activeColor]: item.color === product.color,
                          })}
                          style={{
                            backgroundColor: item.color,
                          }}
                        />
                      </label>
                    ))}
                  </div>
                </div>

                {/* CAPACITY */}
                <div className={styles.capacityBlock}>
                  <span className={styles.capacityText}>
                    {t('product.selectCapacity')}
                  </span>

                  <div className={styles.capacityOptions}>
                    {capacityLinks.map(item => (
                      <label key={item.id}>
                        <input
                          className={styles.radio}
                          type="radio"
                          name="capacity"
                          value={item.capacity}
                          checked={item.capacity === product.capacity}
                          onChange={() => navigate(`/product/${item.id}`)}
                        />

                        <span
                          className={cn(styles.capacity, {
                            [styles.activeCapacity]:
                              item.capacity === product.capacity,
                          })}
                        >
                          {item.capacity}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <ProductInfo
                  product={mapProductDetails(product)}
                  price={priceDiscount}
                  fullPrice={priceRegular}
                  specs={[
                    { key: 'Screen', value: screen },
                    {
                      key: 'Capacity',
                      value: capacity,
                    },
                    {
                      key: 'RAM',
                      value: ram,
                    },
                  ]}
                />
              </div>

              <span className={styles.idOn1200}>ID: {itemId}</span>
            </div>
          </div>

          {/* ABOUT + TECH SPECS */}
          <div className={styles.addInfo}>
            <div className={styles.leftPart}>
              <section className={styles.about}>
                <h2 className={styles.specsTitle}>{t('productInfo.about')}</h2>

                {description.map(section => (
                  <div className={styles.description} key={section.title}>
                    <div className={styles.descriptionTexts}>
                      {section.text.map(text => (
                        <p className={styles.descriptionText} key={text}>
                          {text}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </section>
            </div>

            <div className={styles.rightPart}>
              <section className={styles.techSpecs}>
                <h2 className={styles.specsTitle}>
                  {t('productInfo.techSpecs')}
                </h2>

                <div className={styles.specs}>
                  {specs.map(spec => {
                    const specForTranlate =
                      'product.specs.' + spec.key.toLocaleLowerCase();

                    return (
                      <div className={styles.spec} key={spec.key}>
                        <div className={styles.spec__key}>
                          {t(specForTranlate)}
                        </div>

                        <div className={styles.spec__value}>{spec.value}</div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.youMayLike}>
        {suggestedProducts.length > 0 && (
          <ProductsSlider products={suggestedProducts} title="youMayLike" />
        )}
      </div>
    </section>
  );
};
