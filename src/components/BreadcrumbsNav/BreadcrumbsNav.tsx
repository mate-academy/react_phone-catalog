import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ProductInfoUnionType } from '../ProductInfoPage';
import './breadcrumbsNav.scss';

import { useProductFilters } from '../../hooks/useProductFilters';

export const BreadcrumbsNav: React.FC = () => {
  const { category, itemId } = useParams();
  const location = useLocation();

  // Подключаем хук для работы с фильтрами (search-параметрами)
  const { getLastSearch } = useProductFilters();

  // Получаем сохранённые последние search-параметры (например "?sort=name&page=3")
  const lastSearch = getLastSearch();

  // Получаем search из location.state (если есть), иначе из текущего location.search, иначе пустая строка
  const backSearch = location.state?.search || location.search || '';

  // Формируем базовый путь назад — категория или пустая строка
  const backPath = `/${category || ''}`;

  // Выбираем, какие search-параметры использовать: либо из location, либо из сохранённых
  const searchToUse = backSearch !== '' ? backSearch : lastSearch;

  // Формируем полный путь назад с параметрами
  const backWithSearch = `${backPath}${searchToUse}`;

  // Формируем название категории с заглавной буквы для отображения
  const pageCategory = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : '';

  const [modelName, setModelName] = useState<string>('');

  useEffect(() => {
    if (!category || !itemId) return;

    fetch(`/api/${category}.json`)
      .then(res => res.json())
      .then(data => {
        const found = data.find((product: ProductInfoUnionType) => product.id === itemId);
        setModelName(found?.name || '');
      });
  }, [category, itemId]);

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
