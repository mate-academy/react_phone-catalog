import React from 'react';
import styles from './GoodLayout.module.scss';
import { SpecsMap } from '../../types/SpecsMap';
import { SpecsList } from '../SpecsList';
import { ProductActions } from '../ProductActions';
import { ProductCategory } from '../../types/ProductCategory';
import { DescriptionBlock } from '../../types/DescriptionBlock';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { Goods } from '../../types/Goods';
import { NavLink, useLocation } from 'react-router-dom';
import { getRouteByCategory } from '../../services/product';
import { findProductVariant } from './findProductVariant';
import { useProductGallery } from '../../utils/hooks/UI/useProductGallery';
import { NavigationState } from '../../types/NavigationState';

type Props = {
  itemId: string;
  category: ProductCategory;
  title: string;
  images: string[];
  priceRegular: number;
  priceDiscount: number;

  description: DescriptionBlock[];

  colorsAvailable: string[];
  capacityAvailable: string[];

  color: string;
  capacity: string;

  fastSpecs: SpecsMap;
  specs: SpecsMap;
  goods: Goods[];
};

export const GoodLayout: React.FC<Props> = ({
  itemId,
  category,
  title,
  images,
  priceRegular,
  priceDiscount,
  description,
  colorsAvailable,
  capacityAvailable,
  color,
  capacity,
  fastSpecs,
  specs,
  goods,
}) => {
  const { t } = useTranslation();
  const location = useLocation();
  const state = location.state as NavigationState | null;

  const {
    activeImageIndex,
    galleryHeight,
    galleryRef,
    photoRef,
    setActiveImageIndex,
  } = useProductGallery(images);

  const buildNextState = (): NavigationState | null => {
    if (!state) {
      return null;
    }

    return {
      ...state,
      prev: {
        pathname: location.pathname,
        search: location.search,
      },
    };
  };

  const generateColorNavs = (newColor: string) => {
    const targetItemId = findProductVariant(goods, newColor, capacity);

    if (!targetItemId) {
      return null;
    }

    return (
      <NavLink
        onClick={() => setActiveImageIndex(0)}
        key={newColor}
        to={`${getRouteByCategory(category)}/${targetItemId}`}
        state={buildNextState()}
        className={({ isActive }) =>
          classNames(styles.goodLayout__color, {
            [styles['goodLayout__color--active']]: isActive,
          })
        }
        style={{ '--goodColor': newColor } as React.CSSProperties}
        aria-label={newColor}
      />
    );
  };

  const generateCapacityNavs = (newCapacity: string) => {
    const targetItemId = findProductVariant(goods, color, newCapacity);

    if (!targetItemId) {
      return null;
    }

    return (
      <NavLink
        onClick={() => setActiveImageIndex(0)}
        key={newCapacity}
        state={state}
        to={`${getRouteByCategory(category)}/${targetItemId}`}
        className={({ isActive }) =>
          classNames(
            'button button--small button--pading',
            isActive ? 'button--filled' : 'button--text',
          )
        }
        aria-label={newCapacity}
      >
        {newCapacity}
      </NavLink>
    );
  };

  return (
    <section className={styles.goodLayout}>
      <h2 className={styles.goodLayout__title}>{title}</h2>

      <div className={styles.goodLayout__main}>
        <div className={styles.goodLayout__photoWrapper}>
          <img
            ref={photoRef}
            className={styles.goodLayout__photo}
            src={images[activeImageIndex]}
            alt={title}
          />

          <div
            className={classNames(
              styles.goodLayout__swipeAction,
              styles['goodLayout__swipeAction--left'],
            )}
            onClick={() => setActiveImageIndex(i => Math.max(i - 1, 0))}
          >
            <span className="icon icon--chevron-active icon--rotate180" />
          </div>

          <div
            className={classNames(
              styles.goodLayout__swipeAction,
              styles['goodLayout__swipeAction--right'],
            )}
            onClick={() =>
              setActiveImageIndex(i => Math.min(i + 1, images.length - 1))
            }
          >
            <span className={'icon icon--chevron-active'} />
          </div>
        </div>

        <div
          style={
            { '--galleryHeight': `${galleryHeight}px` } as React.CSSProperties
          }
          ref={galleryRef}
          className={styles.goodLayout__gallery}
        >
          {images.map((image, index) => (
            <div
              key={image}
              className={classNames(
                styles['goodLayout__gallery-photo-wrapper'],
                {
                  [styles['goodLayout__gallery-photo-wrapper--active']]:
                    index === activeImageIndex,
                },
              )}
              onClick={() => setActiveImageIndex(index)}
            >
              <img
                className={styles['goodLayout__gallery-photo']}
                src={image}
                alt={`${title} ${index + 1}`}
              />
            </div>
          ))}
        </div>

        <div className={styles.goodLayout__info}>
          <div className={styles['goodLayout__options-wrapper']}>
            <p className={styles['goodLayout__options-header']}>
              {t('availableColors')}
            </p>
            <p
              className={classNames(
                styles.goodLayout__id,
                styles['goodLayout__id--mobile'],
              )}
            >
              ID:{itemId}
            </p>
          </div>
          <div className={styles.goodLayout__options}>
            {colorsAvailable.map(colorItem => generateColorNavs(colorItem))}
          </div>

          <span
            style={{ marginBottom: '24px' }}
            className={styles.goodLayout__seperator}
          />

          <p className={styles['goodLayout__options-header']}>
            {t('selectCapacity')}
          </p>
          <div className={styles.goodLayout__options}>
            {capacityAvailable.map(capacityItem =>
              generateCapacityNavs(capacityItem),
            )}
          </div>

          <span className={styles.goodLayout__seperator} />

          <div className={styles.goodLayout__prices}>
            <span className={styles.goodLayout__priceDiscount}>
              ${priceDiscount}
            </span>
            <span className={styles.goodLayout__priceRegular}>
              ${priceRegular}
            </span>
          </div>
          <ProductActions itemId={itemId} category={category} size="big" />
          <div style={{ marginTop: '32px' }}>
            <SpecsList specs={fastSpecs} />
          </div>
        </div>
        <p
          className={classNames(
            styles.goodLayout__id,
            styles['goodLayout__id--desktop'],
          )}
        >
          ID:{itemId}
        </p>
      </div>
      <div className={styles['goodLayout__aditional-info']}>
        <div className={styles.goodLayout__about}>
          <h3 className={styles['goodLayout__aditional-header']}>
            {t('about')}
          </h3>
          <span
            style={{ marginBottom: '24px' }}
            className={styles.goodLayout__seperator}
          />
          <dl className={styles['goodLayout__about-list']}>
            {description.map(({ title: label, text }) => (
              <div className={styles['goodLayout__about-item']} key={label}>
                <h4 className={styles['goodLayout__about-label']}> {label}</h4>
                {text.map(des => {
                  return (
                    <p key={des} className={styles['goodLayout__about-value']}>
                      {des}
                    </p>
                  );
                })}
              </div>
            ))}
          </dl>
        </div>
        <div className={styles.goodLayout__tech}>
          <h3 className={styles['goodLayout__aditional-header']}>
            {t('tech')}
          </h3>
          <span
            style={{ marginBottom: '24px' }}
            className={styles.goodLayout__seperator}
          />
          <SpecsList specs={specs} />
        </div>
      </div>
    </section>
  );
};
