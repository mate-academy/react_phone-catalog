import { NavLink } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

type Crumb = {
  label: string;
  to?: string;
};

type Props = {
  items: Crumb[];
};

export const Breadcrumbs = ({ items }: Props) => {
  return (
    <div className={styles.wrapper}>
      {/* Home icon */}
      <NavLink to="/" className={styles.icon} aria-label="Go to homepage">
        <div className={styles.iconInner}>
          <span
            className={`${styles.maskIcon} ${styles.homeIcon}`}
            aria-hidden="true"
          />
        </div>
      </NavLink>

      {/* Arrow after home if crumbs exist */}
      {items.length > 0 && (
        <img src="./img/icons/ArrowRight.svg" alt="" className={styles.arrow} />
      )}

      {/* Breadcrumb items */}
      <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <span key={item.label} className={styles.item}>
              {item.to && !isLast ? (
                <NavLink to={item.to} className={styles.link}>
                  {item.label}
                </NavLink>
              ) : (
                <span className={styles.current}>{item.label}</span>
              )}

              {/* Arrow between items */}
              {!isLast && (
                <img
                  src="./img/icons/ArrowRight.svg"
                  alt=""
                  className={styles.arrow}
                />
              )}
            </span>
          );
        })}
      </nav>
    </div>
  );
};
