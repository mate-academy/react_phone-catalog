import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import HeartActive from '@/assets/icons/heart-active.svg?react';
import Heart from '@/assets/icons/heart.svg?react';
import { Device } from '@/modules/products/schema';
import { getColorHex } from '@/modules/products/utils';
import { Property } from '@/shared/components';
import { AccentButton, Button, CircleButton } from '@/shared/components/ui';
import { useCartButton, useFavoriteButton } from '@/shared/hooks';
import { cn } from '@/shared/utils';

import styles from './Actions.module.scss';
import { Navigation } from './Navigation';

interface Props {
  device: Device;
  discount?: boolean;
  className?: string;
}

export const Actions = ({ device, discount = true, className }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isFavorite, onFavoriteClick } = useFavoriteButton(device.id);
  const { isSelected, onSelectClick } = useCartButton(device.id);

  const {
    namespaceId,
    capacity,
    color,
    category,
    colorsAvailable,
    capacityAvailable,
    priceDiscount,
    priceRegular,
    screen,
    resolution,
    processor,
    ram,
  } = device;

  const handleChoseColor = useCallback(
    (newColor: string) => {
      const followId = `${namespaceId}-${capacity.toLowerCase()}-${newColor}`;

      navigate(`/${category}/${followId}`);
    },
    [capacity, category, namespaceId, navigate],
  );

  const handleChoseCapacity = useCallback(
    (newCapacity: string) => {
      const followId = `${namespaceId}-${newCapacity.toLowerCase()}-${color}`;

      navigate(`/${category}/${followId}`);
    },
    [category, color, namespaceId, navigate],
  );

  return (
    <section className={cn(styles.actions, className)}>
      <Navigation title={t('avaliableColors')} classNames={styles.nav__color}>
        {colorsAvailable.map(item => (
          <div
            key={item}
            className={cn(styles.color, {
              [styles.selected]: item === color,
            })}
          >
            <Button
              className={styles.color__button}
              style={{ backgroundColor: getColorHex(item) }}
              onClick={() => handleChoseColor(item)}
            />
          </div>
        ))}
      </Navigation>

      <Navigation title={t('selectCapacity')} classNames={styles.nav__capacity}>
        {capacityAvailable.map(item => (
          <Button
            key={item}
            className={cn(styles.capacity__button, {
              [styles.capacity__active]: item === capacity,
            })}
            onClick={() => handleChoseCapacity(item)}
          >
            {item}
          </Button>
        ))}
      </Navigation>

      <div className={styles.price}>
        <span className={styles.price__regular}>
          {`$${discount ? priceDiscount : priceRegular}`}
        </span>
        {discount && (
          <span
            className={`${styles.price__regular} ${styles.price__discount}`}
          >
            {`$${priceRegular}`}
          </span>
        )}
      </div>

      <div className={styles.buttons}>
        <AccentButton
          title={t(isSelected ? 'addedToCart' : 'addToCart')}
          onClick={onSelectClick}
          disabled={isSelected}
        />
        <CircleButton onClick={onFavoriteClick}>
          {isFavorite ? <HeartActive /> : <Heart />}
        </CircleButton>
      </div>

      <div className={styles.info}>
        <Property
          title={t('screen')}
          text={screen}
          titleClassName={styles.typography}
        />
        <Property title={t('resolution')} text={resolution} />
        <Property title={t('processor')} text={processor} />
        <Property title={t('ram')} text={ram} />
      </div>
    </section>
  );
};
