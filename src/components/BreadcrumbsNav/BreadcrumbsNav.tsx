import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ProductInfoUnionType } from '../ProductInfoPage';
import './breadcrumbsNav.scss';

export const BreadcrumbsNav: React.FC = () => {
  const { category, itemId } = useParams();
  const location = useLocation();

  const backSearch = location.state?.search || location.search;
  const backPath = `/${category || ''}`;
  const backWithSearch = `${backPath}${backSearch}`;

  const pageCategory = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : '';

  const [modelName, setModelName] = useState<string>('');

  useEffect(() => {
    fetch(`/api/${category}.json`)
      .then(res => res.json())
      .then(data => {
        const found = data.find((product: ProductInfoUnionType) => product.id === itemId);
        setModelName(found?.name || '');
      });
  }, [itemId]);

  return (
    <div className="breadcrumbsNav-block">
      <div className="breadcrumbs-navigation">
        <Link to="/" className="homeLink icon">
          <img src="/img/icons/Home.svg" alt="Home Page icon" />
        </Link>

        <img src="/img/icons/NotActiveArrowRight.svg" alt="arrow icon" />

        <Link to={backWithSearch} className="breadcrumbs-link">
          {pageCategory}
        </Link>

        {modelName && (
          <>
            <img src="/img/icons/NotActiveArrowRight.svg" alt="arrow icon" />
            <div className="model-name">{modelName}</div>
          </>
        )}
      </div>

      {modelName && (
        <div className="button-back-block">
          <Link to={backWithSearch} className="icon">
            <img src="/img/icons/ArrowLeft.svg" alt="arrow icon" className="icon" />
          </Link>

          <Link to={backWithSearch} className="breadcrumbs-link">
            <div className="back-text">Back</div>
          </Link>
        </div>
      )}
    </div>
  );
};
