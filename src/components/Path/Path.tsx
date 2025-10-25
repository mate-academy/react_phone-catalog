import { Link, useLocation } from 'react-router-dom';
import styles from './Path.module.scss';
import classNames from 'classnames';
import { Icon } from '../Icon';

export const Path: React.FC = () => {
  const location = useLocation().pathname.split('/').slice(1);
  const pathList = location.map((val, index, arr) => {
    return arr
      .slice(0, index + 1)
      .reduce((prev, curr) => prev + `/${curr}`, '');
  });

  return (
    <nav className={classNames(styles.path)}>
      <ul className={classNames(styles.path__list)}>
        <li className={classNames(styles['path__list-item'])}>
          <Link to="/" className={classNames(styles['path__list-link'])}>
            <Icon path={'/img/icons/home.svg'} name={'home'} />
          </Link>
        </li>
        {pathList.map((p, i) => (
          <li key={i} className={classNames(styles['path__list-item'])}>
            <div className={classNames(styles['path__list-arrow'])}>
              <Icon path={'/img/icons/arrow-right-grey.svg'} name={'arrow'} />
            </div>
            <Link to={p} className={classNames(styles['path__list-link'])}>
              {location[i].replaceAll('%', ' ')}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
