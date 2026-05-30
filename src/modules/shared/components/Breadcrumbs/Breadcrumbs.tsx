import { FC } from 'react';
import { Link } from 'react-router-dom';
import home from '../../../../assets/images/icons/home.svg';
import right from '../../../../assets/images/icons/arrow-right.svg';
import s from './Breadcrumbs.module.scss';

interface Props {
  paths: { link: string | null; label: string }[];
}

export const Breadcrumbs: FC<Props> = ({ paths }) => {
  return (
    <nav className={s.breadcrumbs}>
      <span className={s.breadcrumbsItem}>
        <Link to="/" className={s.breadcrumbsLink}>
          <img src={home} alt="icon home" />
        </Link>
        <img src={right} alt="icon right" className={s.breadcrumbsImg} />
      </span>
      {paths.map(path =>
        path.link ? (
          <span className={s.breadcrumbsItem} key={path.label}>
            <Link to={path.link} className={s.breadcrumbsLink}>
              {path.label}
            </Link>
            <img src={right} alt="icon right" className={s.breadcrumbsImg} />
          </span>
        ) : (
          <span className={s.breadcrumbsSpan} key={path.label}>
            {path.label}
          </span>
        ),
      )}
    </nav>
  );
};
