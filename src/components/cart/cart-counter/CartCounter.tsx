import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import cn from 'classnames';

import { Icons, QuantityControl } from '@ui/index';

import { onKeyDown } from '@utils/helpers/pressOnKey';

import styles from './CartCounter.module.scss';

type TProps = {
  quantity: number;
  showError: boolean;
  onAddClick: () => void;
  onDeleteClick: () => void;
};

export const CartCounter: FC<TProps> = ({
  quantity,
  showError,
  onAddClick,
  onDeleteClick,
}) => {
  const { t } = useTranslation();
  const disabled = quantity === 1;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    onKeyDown(event, quantity, onAddClick, onDeleteClick);
  };

  return (
    <div className={styles.counter}>
      <QuantityControl
        label={t('cart.quantity.decrease')}
        onClick={onDeleteClick}
        disabled={disabled || showError}
      >
        <Icons.MinusIcon />
      </QuantityControl>
      <label htmlFor="quantity-input" className="visually-hidden">
        {t('cart.quantity.label')}
      </label>
      <input
        id="quantity-input"
        className={cn(styles.quantity, { [styles.error]: showError })}
        type="number"
        min="1"
        value={quantity}
        onChange={onAddClick}
        onKeyDown={handleKeyDown}
        readOnly={showError}
      />
      <QuantityControl
        label={t('cart.quantity.increase')}
        onClick={onAddClick}
        disabled={showError}
      >
        <Icons.PlusIcon />
      </QuantityControl>
    </div>
  );
};
