import { useLocation, useParams } from 'react-router-dom';
import { useProductFilters } from '../components/hooks/useProductFilters';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import style from './LocationNav.module.scss';
import home from '../../public/img/Icons/home-icon.svg';
/* eslint max-len: "off" */
import NotActiveArrowRight from '../../public/img/Icons/notActive-arrow-right.svg';
import NotActiveArrowLeft from '../../public/img/Icons/notActive-arrow-left.svg';
import { ProductInfoUnionType } from '../Pages/ProductInfoPage/ProductInfoPage';

export const LocationNav: React.FC = () => {
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
    if (!category || !itemId) {
      return;
    }

    fetch(`api/${category}.json`)
      .then(res => res.json())
      .then(data => {
        const found = data.find(
          (product: ProductInfoUnionType) => product.id === itemId,
        );

        setModelName(found?.name || '');
      });
  }, [itemId, category]);

  return (
    <div className={style['LocationNav-block']}>
      <div className={style['LocationNav-navigation']}>
        <Link to="/" className={style.homeLink}>
          <img src={home} alt="Home Page icon" />
        </Link>

        <img src={NotActiveArrowRight} alt="arrow icon" />

        {itemId ? (
          <Link to={backWithSearch} className={style.locationLink}>
            {pageName}
          </Link>
        ) : (
          <p className={style.smallText}>{pageName}</p>
        )}

        {modelName && (
          <>
            <img src={NotActiveArrowRight} alt="arrow icon" />
            <p className={style.smallText}>{modelName}</p>
          </>
        )}
      </div>

      {modelName && (
        <div className={style['buttonBack-block']}>
          <Link to={backWithSearch} className={style.icon}>
            <img src={NotActiveArrowLeft} alt="arrow icon" />
          </Link>

          <Link to={backWithSearch} className={style.locationLink}>
            <div className={style.backText}>Back</div>
          </Link>
        </div>
      )}
    </div>
  );
};
