import React from 'react';
import styles from './ButtonPrimary.module.scss';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

interface Props {
  isSelected?: boolean;
  onClick: (e: React.MouseEvent) => void;
  className?: string;
  children?: React.ReactNode;
}

export const ButtonPrimary: React.FC<Props> = ({
  isSelected = false,
  onClick,
  className = '',
  children,
}) => {
  const { t } = useTranslation();

  return (
    <button
      type="button"
      className={cn(styles.button, className, {
        [styles.buttonSelected]: isSelected,
      })}
      onClick={onClick}
    >
      {children || (isSelected ? t('buttons.added') : t('buttons.addToCart'))}
    </button>
  );
};
