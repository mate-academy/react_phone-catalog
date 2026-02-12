import React from 'react';
import classNames from 'classnames';
import styles from './Plus.module.scss';

type PlugSize = 'sm' | 'md' | 'lg' | '100width';
type ImageSize = 'sm' | 'md' | 'lg';

type Props = {
  label: string;
  description?: string;
  image?: string;
  size?: PlugSize;
  imageSize?: ImageSize;
  children?: React.ReactNode;
};

export const Plug: React.FC<Props> = ({
  label,
  image = 'img/product-not-found.png',
  size = 'md',
  description,
  imageSize = 'md',
  children,
}) => {
  return (
    <div className={classNames(styles.plug, styles[`plug--${size}`])}>
      <img
        className={classNames(
          styles.plug__image,
          styles[`plug__image--${imageSize}`],
        )}
        src={image}
        alt={label}
      />

      <h4 className={styles.plug__label}>{label}</h4>

      {description && <p className={styles.plug__description}>{description}</p>}

      {children && <div className={styles.plug__actions}>{children}</div>}
    </div>
  );
};
