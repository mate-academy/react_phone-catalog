import React from 'react';
import styles from './ProductDescription.module.scss';
import cn from 'classnames';

type Props = {
  articleName: string;
  customClassName?: string;
  children?: React.ReactNode;
};

export const ProductDescription: React.FC<Props> = ({
  articleName,
  customClassName,
  children,
}) => {
  const customClassNames = cn(styles.articleName, customClassName);

  return (
    <article>
      <h3
        className={customClassName ? customClassNames : `${styles.articleName}`}
      >
        {articleName}
      </h3>

      {children && <div className={styles.childrenContainer}>{children}</div>}
    </article>
  );
};
