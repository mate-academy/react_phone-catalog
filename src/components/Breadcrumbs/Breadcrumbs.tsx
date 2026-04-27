import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Breadcrumbs.module.scss';
import home from '../../assets/icons/Home.svg';
import { Chevron } from '../icons/Chevron';

type Props = {
  productName?: string;
};

export const Breadcrumbs: React.FC<Props> = ({ productName }) => {
  const location = useLocation();
  const parts = location.pathname.split('/').filter(Boolean);

  const [category, productSlug] = parts;

  const formattedCategory = category
    ? category.replace(/\b\w/g, char => char.toUpperCase())
    : '';

  if (!category) {
    return null;
  }

  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      <NavLink to="/" className={styles.breadcrumbs__home}>
        <img className={styles.breadcrumbs__homeImg} src={home} alt="Home" />
      </NavLink>

      <span className={styles.breadcrumbs__chevron}>
        <Chevron direction="right" />
      </span>

      <NavLink
        to={`/${category}`}
        className={classNames(styles.breadcrumbs__category, {
          [styles.breadcrumbs__categoryActive]: !!productName,
          [styles.breadcrumbs__categoryMuted]: !productName,
        })}
      >
        {formattedCategory}
      </NavLink>

      {productName && (
        <>
          <span className={styles.breadcrumbs__chevron}>
            <Chevron direction="right" />
          </span>

          <NavLink
            to={`/${category}/${productSlug}`}
            className={styles.breadcrumbs__product}
          >
            {productName}
          </NavLink>
        </>
      )}
    </nav>
  );
};
