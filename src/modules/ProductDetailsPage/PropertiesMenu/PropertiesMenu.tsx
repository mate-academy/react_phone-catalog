import styles from './PropertiesMenu.module.scss';

import cn from 'classnames';
import { ProductDetail } from '../../../types/ProductDetail';
import { APPLE_COLORS } from '../../constants';
import { useLocation, useNavigate } from 'react-router-dom';
import { getClassNames } from '../../../utils/classNames';
import { capitalizeFirstLetter } from '../../../utils/common';
import React from 'react';

interface PropertyLink {
  propValue: string;
  link: string;
}

type PropType = keyof ProductDetail;

interface Props {
  product: ProductDetail;
  propTitle: string;
  propType: PropType;
  propAvailable: PropType;
  additionalStyles?: string;
}

function getOtherVariantsLinks(
  product: ProductDetail,
  propType: PropType,
  propAvailable: PropType,
): PropertyLink[] {
  if (!Array.isArray(product.colorsAvailable)) {
    return [];
  }

  return (product[propAvailable] as string[])
    .map(propValue => {
      if (product[propType] === propValue) {
        return { propValue, link: `/${product.category}/${product.id}` };
      }

      const currentPropId = String(product[propType])
        .replaceAll(' ', '-')
        .toLocaleLowerCase();
      const newPropId = propValue.replaceAll(' ', '-').toLowerCase();
      const otherItemId = product.id.replace(currentPropId, newPropId);
      const category = product.category;

      return otherItemId
        ? { propValue, link: `/${category}/${otherItemId}` }
        : null;
    })
    .filter(link => !!link) as PropertyLink[];
}

const PropertiesMenu: React.FC<Props> = ({
  product,
  propTitle,
  propType,
  propAvailable,
  additionalStyles = '',
}) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const linkClass = getClassNames(
    'properties__link',
    capitalizeFirstLetter(propType),
    styles,
  );

  const linkClassActive = getClassNames(
    'properties__link',
    capitalizeFirstLetter(propType) + `_active`,
    styles,
  );

  return (
    <div className={styles.properties + ' ' + additionalStyles}>
      <h4 className={styles.properties__title}>{propTitle}</h4>
      <menu className={styles.properties__menu}>
        {getOtherVariantsLinks(product, propType, propAvailable).map(
          ({ propValue, link }: PropertyLink) => {
            const isChecked = pathname === link;

            return (
              <label key={propValue}>
                <input
                  className={styles.properties__input}
                  type="radio"
                  name={propType}
                  value={APPLE_COLORS[propValue] || propValue}
                  checked={isChecked}
                  onChange={() => !isChecked && navigate(link)}
                />
                <span
                  className={cn(linkClass, {
                    [linkClassActive]: isChecked,
                  })}
                  style={{
                    backgroundColor: APPLE_COLORS[propValue] || propValue,
                  }}
                  title={propValue}
                >
                  {propType !== 'color' && propValue}
                </span>
              </label>
            );
          },
        )}
      </menu>
    </div>
  );
};

export default PropertiesMenu;
