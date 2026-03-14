import s from './Breadcrumbs.module.scss';
import home from '../../assets/images/icons/Home.svg';
import arrow from '../../assets/images/icons/Vector-right(Stroke).svg';
import { Link } from 'react-router-dom';

type Props = {
  categoryName: string;
  productName?: string;
};

export const Breadcrumbs: React.FC<Props> = ({ categoryName, productName }) => {
  return (
    <nav className={s.navContent} aria-label="Breadcrumb">
      <Link to="/" className={s.navLink}>
        <img className={s.navImg} src={home} alt="home" />
      </Link>

      <div className={s.arrow} aria-hidden="true">
        <img className={s.navImg} src={arrow} alt="arrow" />
      </div>

      <Link to={`/${categoryName}`} className={productName ? s.navLink : s.path}>
        <span>{categoryName}</span>
      </Link>

      {productName && (
        <>
          <div className={s.arrow}>
            <img className={s.navImg} src={arrow} alt="arrow" />
          </div>

          <span className={s.path}>{productName}</span>
        </>
      )}
    </nav>
  );
};
