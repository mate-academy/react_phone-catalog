import { useLocation, Link } from 'react-router-dom';
import style from './SelectCapacity.module.scss';
import classNames from 'classnames';

interface Props {
  capacity: string[];
  activeCapacity: string;
}

export const SelectCapacity: React.FC<Props> = ({
  capacity: capacities,
  activeCapacity,
}) => {
  const location = useLocation();
  const path = location.pathname.toLowerCase();

  const formatCapacity = (capacity: string) => {
    return capacity.replace(/(\d+)([a-zA-Z]+)/i, '$1 $2');
  };

  return (
    <div className={style['select-capacity']}>
      <p className={style['select-capacity__title']}>Select capacity</p>
      <ul className={style['select-capacity__list']}>
        {capacities.map(capacity => {
          const isActive = activeCapacity === capacity;
          const newPath = path
            .split(activeCapacity.toLowerCase())
            .join(capacity.toLowerCase());

          return (
            <li key={capacity} className={style['select-capacity__item']}>
              <Link
                to={isActive ? '' : newPath}
                className={classNames(style['select-capacity__link'], {
                  [style['select-capacity__link--active']]: isActive,
                })}
              >
                {formatCapacity(capacity)}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
