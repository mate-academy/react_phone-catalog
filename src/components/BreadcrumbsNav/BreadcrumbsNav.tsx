import './breadcrumbsNav.scss';
import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ProductInfoUnionType } from '../ProductInfoPage';
import { useProductFilters } from '../../hooks/useProductFilters';

export const BreadcrumbsNav: React.FC = () => {
  const location = useLocation();
  const { category, itemId } = useParams();
  const { getLastSearch } = useProductFilters();
  const pageName = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : '';
  const lastSearch = getLastSearch();
  const backSearch = location.state?.search || location.search || '';
  const searchToUse = backSearch !== '' ? backSearch : lastSearch;
  const [modelName, setModelName] = useState<string>('');
  const backPath = `/${category || ''}`;
  const backWithSearch = `${backPath}${searchToUse}`;

  useEffect(() => {
    if (!category || !itemId) return;

    fetch(`api/${category}.json`)
      .then(res => res.json())
      .then(data => {
        const found = data.find(
          (product: ProductInfoUnionType) => product.id === itemId,
        );

        setModelName(found?.name || '');
      });
  }, [itemId]);

  return (
    <div className="breadcrumbsNav-block">
      <div className="breadcrumbs-navigation">
        <Link to="/" className="homeLink icon">
          <img src="img/icons/Home.svg" alt="Home Page icon" />
        </Link>

        <img src="img/icons/NotActiveArrowRight.svg" alt="arrow icon" />

        {itemId ? (
          <Link to={backWithSearch} className="breadcrumbs-link">
            {pageName}
          </Link>
        ) : (
          <p className="small-text-12-600">{pageName}</p>
        )}

        {modelName && (
          <>
            <img src="img/icons/NotActiveArrowRight.svg" alt="arrow icon" />
            <p className="small-text-12-600 model-name">{modelName}</p>
          </>
        )}
      </div>

      {modelName && (
        <div className="button-back-block">
          <Link to={backWithSearch} className="icon">
            <img
              src="img/icons/ArrowLeft.svg"
              alt="arrow icon"
              className="icon"
            />
          </Link>

          <Link to={backWithSearch} className="breadcrumbs-link">
            <div className="back-text">Back</div>
          </Link>
        </div>
      )}
    </div>
  );
};
