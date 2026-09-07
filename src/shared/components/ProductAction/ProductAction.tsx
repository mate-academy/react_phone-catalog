import React from 'react';
import styles from './ProductAction.module.scss';
import { PrimaryButton } from '../../UI/Buttons/PrimaryButton';
import { FavoriteButton } from '../../UI/Buttons/FavoriteButton';
import { useTranslation } from 'react-i18next';

interface Props {
  toBag?: boolean;
  toFavourite?: boolean;
  onAddToCart?: () => void;
  onAddToFavourite?: () => void;
}

export const ProductAction: React.FC<Props> = ({
  toBag = false,
  toFavourite = false,
  onAddToCart = () => {},
  onAddToFavourite = () => {},
}) => {
  const { t } = useTranslation();
  return (
    <div className={styles.buttons}>
      <PrimaryButton
        active={toBag}
        classNames={styles.primaryButton}
        onClick={onAddToCart}
      >
        {toBag
          ? t('ui.product_action_button.not_active')
          : t('ui.product_action_button.active')}
      </PrimaryButton>

      <FavoriteButton
        active={toFavourite}
        className={styles.favoriteButton}
        onClick={onAddToFavourite}
      />
    </div>
  );
};
