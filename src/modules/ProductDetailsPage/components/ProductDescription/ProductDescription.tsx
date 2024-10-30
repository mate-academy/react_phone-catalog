import React, { useContext } from 'react';
import classNames from 'classnames';
import { DescriptionProduct } from '../../../../types/Product';
import styles from './ProductDescription.module.scss';
import { ThemeContext } from '../../../../store/ThemeProvider';

type Props = {
  descriptions: DescriptionProduct[];
  otherClass?: string;
};
export const ProductDescription: React.FC<Props> = ({
  descriptions,
  otherClass,
}) => {
  const { isThemeDark } = useContext(ThemeContext);

  return (
    <div className={classNames(styles.ProductDescription, otherClass)}>
      {descriptions.map(description => (
        <div
          className={styles.ProductDescription__block}
          key={description.title}
        >
          <h4 className={styles.ProductDescription__blockTitle}>
            {description.title}
          </h4>

          <div
            className={classNames(styles.ProductDescription__blockText, {
              [styles.ProductDescription__blockText_darkTheme]: isThemeDark,
            })}
          >
            {description.text.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
