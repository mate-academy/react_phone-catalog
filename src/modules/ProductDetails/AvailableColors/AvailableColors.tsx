import { Link, useLocation } from 'react-router-dom';
import styles from './AvailableColors.module.scss';
import cn from 'classnames';

interface Props {
  colors: string[];
  currentColor: string;
}

export const AvailableColors: React.FC<Props> = ({ colors, currentColor }) => {
  const location = useLocation();
  const path = location.pathname.toLowerCase();
  const colorMap: Record<string, string> = {
    black: '#000',
    gold: '#FFD700',
    yellow: '#FFFF00',
    green: '#008000',
    midnightgreen: '#004953',
    silver: '#c0c0c0',
    spacegray: '#717378',
    red: '#ff0000',
    white: '#FFF',
    purple: '#800080',
    coral: '#ff7f50',
    rosegold: '#B76E79',
    midnight: '#191970',
    spaceblack: '#505150',
    blue: '#0000ff',
    pink: '#ffc0cb',
    sierrablue: '#BFDAF7',
    graphite: '#41424C',
    skyblue: '#87CEEB',
    starlight: '#F8F9EC',
  };

  return (
    <div className={styles['available-colors']}>
      <p className={styles['available-colors__title']}>Available colors</p>
      <ul className={styles['available-colors__list']}>
        {colors.map(color => {
          const formattedColor = color.split(' ').join('-');
          const isActive = color === currentColor;
          const newPath = path
            .split(currentColor.split(' ').join('-'))
            .join(formattedColor);

          return (
            <li
              className={cn(styles['available-colors__item'], {
                [styles['available-colors__item--active']]: isActive,
              })}
              key={color}
            >
              <Link
                style={{ backgroundColor: colorMap[color.replaceAll(' ', '')] }}
                className={styles['available-colors__link']}
                to={isActive ? '' : newPath}
              ></Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
