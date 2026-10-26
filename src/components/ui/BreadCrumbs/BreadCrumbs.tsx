/* eslint-disable max-len */
import { Link, useLocation } from 'react-router-dom';
import HomeIcon from './icon-home.svg?react';
import ArrowRight from '../../../../public/icons/chevron-arrow-right-primary.svg?react';
import styles from './BreadCrumbs.module.scss';
import cn from 'classnames';
import { HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLDivElement>;

export const BreadCrumbs = ({ className, ...props }: Props) => {
  const path = useLocation().pathname.split('/').filter(Boolean);

  return (
    <div className={cn(styles.breadCrumbs, className)} {...props}>
      <Link to="/" className={styles.home}>
        <HomeIcon />
      </Link>

      {path.map((el, index) => (
        <div key={el} className={styles.crumb}>
          <ArrowRight />

          {index === path.length - 1 ? (
            <span className={cn(styles.capitalize, styles.current)}>
              {el.replaceAll('-', ' ')}
            </span>
          ) : (
            <Link to={`/${el}`} className={styles.capitalize}>
              {el.replaceAll('-', ' ')}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};
