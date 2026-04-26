import { Link, useParams } from 'react-router-dom';
import './Breadcrumbs.scss';

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

  const formattedCategory =
    category && category[0].toUpperCase() + category.slice(1);

  const title = category ? TITLE_MAP[category] : '';

  return (
    <nav className="breadcrumbs">
      <Link to="/" className="breadcrumbs__home">
        <img src="./img/Home.svg" alt="Home" />
      </Link>

      {title && (
        <>
          <img
            src="./img/Arrow_Right_Grey.svg"
            alt="Arrow"
            className="breadcrumbs__arrow"
          />
          <Link to={`/${category}`} className="breadcrumbs__current">
            {title}
          </Link>
        </>
      )}

      {/* NEW: Arrow + Product name */}
      {productName && (
        <>
          <img
            src="./img/Arrow_Right_Grey.svg"
            alt="Arrow"
            className="breadcrumbs__arrow"
          />
          <span className="breadcrumbs__current">{productName}</span>
        </>
      )}
    </nav>
  );
};

export default Breadcrumbs;
