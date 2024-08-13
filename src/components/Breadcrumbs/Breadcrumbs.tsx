import cn from 'classnames';
import { Link, useLocation } from 'react-router-dom';

import { IconRight } from '../../ui/IconRight';

import iconHome from '../../assets/images/home.svg';
import { capatalize } from '../../utils';

import styles from './Breadcrumbs.module.scss';

type Props = {
  category: string | undefined;
  productName?: string;
};

export const Breadcrumbs: React.FC<Props> = ({ category, productName }) => {
  const { pathname } = useLocation();

  return (
    <div className={styles.breadcrumbs}>
      <Link className={styles.link} to="/">
        <img className={styles.icon} src={iconHome} alt="icon" />
      </Link>

      <IconRight fill="#4A4D58 " />

      {category !== pathname.slice(1) ? (
        <Link
          to={`/${category}`}
          className={cn(styles.path, styles.link, {
            [styles['path--active']]: category !== pathname.slice(1),
          })}
        >
          {category && capatalize(category)}
        </Link>
      ) : (
        <p className={cn(styles.path)}>{capatalize(category)}</p>
      )}

      {productName && <IconRight fill="#4A4D58 " />}

      <p className={styles.path}>{productName && capatalize(productName)}</p>
    </div>
  );
};
