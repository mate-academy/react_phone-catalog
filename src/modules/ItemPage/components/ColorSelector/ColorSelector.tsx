import classNames from 'classnames';
import styles from './ColorSelector.module.scss';
import { COLOR } from './constants';
import { IconButton } from '../../../shared/components/IconButton';

interface Props {
  colors: string[];
  currentColor: string;
  productId?: string;
  handleColorChange: (color: string) => void;
}

export const ColorSelector: React.FC<Props> = ({
  colors,
  currentColor,
  productId,
  handleColorChange,
}) => {
  return (
    <div className={styles['color-selector']}>
      <div className={styles['color-selector__header']}>
        <span className={styles['color-selector__title']}>
          Available colors
        </span>
        {productId && (
          <span
            className={styles['color-selector__id']}
          >{`ID: ${productId}`}</span>
        )}
      </div>
      <ul className={styles['color-selector__list']}>
        {colors.map(color => (
          <li
            className={classNames(styles['color-selector__item'])}
            key={color}
          >
            <IconButton
              className={classNames(styles['color-selector__swatch'], {
                [styles['color-selector__swatch--active']]:
                  currentColor === color,
              })}
              style={{ backgroundColor: COLOR[color] }}
              onClick={() => handleColorChange(color)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
