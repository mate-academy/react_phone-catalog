//#region imports
import { FC } from 'react';
import { QuantityButton } from '../QuantityButton';
import baseStyles from './base.module.scss';
import styles from './QuantityControls.module.scss';
import { useTranslation } from 'react-i18next';
//#endregion

type Props = {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
};

export const QuantityControls: FC<Props> = ({
  quantity,
  onIncrease,
  onDecrease,
}) => {
  const { t } = useTranslation('cart');

  return (
    <div
      className={`${baseStyles.quantity} ${styles.quantity}`}
      role="group"
      aria-label={t('quantitySelector')}
    >
      <QuantityButton
        type="minus"
        onClick={onDecrease}
        disabled={quantity <= 1}
      />

      <span aria-live="polite">{quantity}</span>

      <QuantityButton type="plus" onClick={onIncrease} />
    </div>
  );
};
