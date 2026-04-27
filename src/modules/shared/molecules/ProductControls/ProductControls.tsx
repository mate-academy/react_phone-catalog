import React from 'react';
import styles from './ProductControls.module.scss';
import { Button } from '../../atoms/Button';
import classNames from 'classnames';
import { Typography } from '../../atoms/Typography';
import { IconButton } from '../../atoms/IconButton';

interface Props {
  onAddToCart: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onToggleFavourite: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isFavourite: boolean;
  isInCart: boolean;
  size?: 'medium' | 'large';
  cartButtonText: string;
  icon: React.ReactNode;
}

export const ProductControls: React.FC<Props> = ({
  onAddToCart,
  onToggleFavourite,
  isInCart,
  isFavourite,
  size = 'medium',
  cartButtonText,
  icon,
}) => {
  return (
    <div className={styles.product_controls}>
      <Button
        size={size}
        onClick={onAddToCart}
        className={classNames(styles['button'], styles['button--primary'], {
          [styles['button--primary--active']]: isInCart,
        })}
        disabled={isInCart}
      >
        <Typography
          variant="buttons"
          className={classNames(styles.button__text, {
            [styles['button__text--active']]: !isInCart,
          })}
        >
          {cartButtonText}
        </Typography>
      </Button>
      <IconButton
        size={size}
        onClick={onToggleFavourite}
        className={classNames(styles['button'], styles['button--favourite'], {
          [styles['button--favourite--active']]: isFavourite,
        })}
      >
        {icon}
      </IconButton>
    </div>
  );
};
