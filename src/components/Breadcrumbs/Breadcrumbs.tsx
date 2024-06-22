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
    <div className={styles.Breadcrumbs}>
      <Link className={styles.BreadcrumbsLink} to="/">
        <img className={styles.BreadcrumbsIcon} src={iconHome} alt="icon" />
      </Link>

      <IconRight fill="#4A4D58 " />

      <p
        className={cn(styles.BreadcrumbsPath, {
          [styles.BreadcrumbsPathActive]: category !== pathname.slice(1),
        })}
      >
        {category && capatalize(category)}
      </p>

      {productName && <IconRight fill="#4A4D58 " />}

      <p className={styles.BreadcrumbsPath}>
        {productName && capatalize(productName)}
      </p>
    </div>
  );
};
