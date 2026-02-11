import { NavLink } from 'react-router-dom';
// eslint-disable-next-line max-len
import { AnyDetailedProduct } from '../../../../../../types/DetailedProductTypes';
// eslint-disable-next-line max-len
import { generateProductPageUrl } from '../../../../../../utils/productUrlGenerators';
import styles from './AvailableColors.module.scss';
import classNames from 'classnames';
import { getColorClassName } from '../../../../../../utils/cssUtils';
import useLanguageStore from '../../../../../../stores/useLanguageStore';

type Props = {
  product: AnyDetailedProduct;
};

export const AvailableColors: React.FC<Props> = ({ product }) => {
  const {
    category,
    namespaceId,
    color: currentColor,
    colorsAvailable,
    capacity: currentCapacity,
  } = product;
  const { t } = useLanguageStore();

  return (
    <div>
      <h3 className={styles['available-colors__title']}>
        {t('available_colors')}
      </h3>

      <div className={styles['available-colors__list']}>
        {colorsAvailable.map(colorOption => {
          const isActive = colorOption === currentColor;
          const url = generateProductPageUrl(
            category,
            namespaceId,
            currentCapacity,
            colorOption,
          );

          const colorClass = getColorClassName(colorOption);

          return (
            <NavLink
              key={colorOption}
              to={url}
              className={classNames(styles['available-colors__item'], {
                [styles['available-colors__item--active']]: isActive,
              })}
              title={colorOption}
            >
              <div
                className={classNames(
                  styles['available-colors__item-circle'],
                  styles[colorClass],
                )}
              ></div>
            </NavLink>
          );
        })}
      </div>

      <div className={styles['available-colors__divider']}></div>
    </div>
  );
};
