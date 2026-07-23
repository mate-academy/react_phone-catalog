import classNames from 'classnames';

import React, { Fragment } from 'react';
import styles from './ColorPicker.module.scss';
import {
  getColorLabel,
  getColorValue,
} from '@modules/ProductDetailsPage/constants/colors';
import { useTranslation } from 'react-i18next';

type Props = {
  colors: string[];
  activeColor: string;
  onChange: (color: string) => void;
  disabled: boolean;
};

export const ColorPicker: React.FC<Props> = ({
  colors,
  activeColor,
  onChange,
  disabled,
}) => {
  const { t } = useTranslation();

  return (
    <div>
      <div className={styles.title}>{t('product.availableColors')}</div>

      <div className={styles.colors}>
        {colors.map(color => (
          <Fragment key={color}>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label
              className={classNames(styles.colorsOption, {
                [styles.colorsActive]: color === activeColor,
              })}
              title={getColorLabel(color)}
            >
              <input
                type="radio"
                name="color"
                value={color}
                checked={color === activeColor}
                onChange={() => onChange(color)}
                className={styles.colorsInput}
                disabled={disabled}
              />

              <span
                className={styles.colorsCircle}
                style={{ backgroundColor: getColorValue(color) }}
              />
            </label>
          </Fragment>
        ))}
      </div>
    </div>
  );
};
