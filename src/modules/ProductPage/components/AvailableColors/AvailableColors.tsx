import { Link, useLocation } from 'react-router-dom';
import styles from './AvailableColors.module.scss';
import cn from 'classnames';
import { colorMap } from '../../../../helpers';

interface Props {
  colors: string[];
  currentColor: string;
  className?: string;
}

export const AvailableColors: React.FC<Props> = ({
  colors,
  currentColor,
  className,
}) => {
  const location = useLocation();

  const path = location.pathname;

  return (
    <div className={cn(styles['available-colors'], className)}>
      <p className={styles['available-colors__title']}>Available colors</p>
      <ul className={styles['available-colors__list']}>
        {colors.map(c => {
          const isActive = c === currentColor;
          const pathArr = path.split('-');

          pathArr[pathArr.length - 1] = c;
          const currentPath = pathArr.join('-');

          return (
            <li
              className={cn(styles['available-colors__item'], {
                [styles['available-colors__item--active']]: isActive,
              })}
              key={c}
            >
              <Link
                style={{ backgroundColor: colorMap[c] }}
                className={styles['available-colors__link']}
                to={isActive ? '' : currentPath}
              ></Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
