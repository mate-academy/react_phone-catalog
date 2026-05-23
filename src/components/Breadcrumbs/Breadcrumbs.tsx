import { Link, useParams } from 'react-router-dom';
import s from './Breadcrumbs.module.scss';

const TITLE_MAP: Record<string, string> = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

interface BreadcrumbsProps {
  productName?: string;
}

const Breadcrumbs = ({ productName }: BreadcrumbsProps) => {
  const { category } = useParams();

  const title = category ? TITLE_MAP[category] : '';

  return (
    <nav className={s.breadcrumbs}>
      <Link to="/" className={s.breadcrumbsHome}>
        <img src="./img/Home.svg" alt="Home" />
      </Link>

      {title && (
        <>
          <img
            src="./img/Arrow_Right_Grey.svg"
            alt="Arrow"
            className={s.breadcrumbsArrow}
          />
          <Link to={`/${category}`} className={s.breadcrumbsCurrent}>
            {title}
          </Link>
        </>
      )}

      {productName && (
        <>
          <img
            src="./img/Arrow_Right_Grey.svg"
            alt="Arrow"
            className={s.breadcrumbsArrow}
          />
          <span className={s.breadcrumbsCurrent}>{productName}</span>
        </>
      )}
    </nav>
  );
};

export default Breadcrumbs;
