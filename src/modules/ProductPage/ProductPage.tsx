import React, { useContext, useState, useMemo, useEffect } from 'react';
import './ProductPage.scss';
import { Dropdown } from '../shared/Dropdown';
import { ProductCard } from '../shared/ProductCard';
import { Pagination } from '../shared/Pagination';
import { useParams } from 'react-router-dom';
import { GlobalContext } from '../../store/GlobalContext';
import { Breadcrumbs } from '../shared/Breadcrumbs';
import { ProductsList } from '../shared/ProductsList';
import { Loader } from '../shared/Loader';

export const ProductPage: React.FC = () => {
  const { products, sortBy, setSortBy } = useContext(GlobalContext);

  const [itemsPerPage, setItemsPerPage] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const { productsType } = useParams<{ productsType: string }>();

  const normalizeProductsType =
    productsType &&
    productsType.charAt(0).toUpperCase() + productsType.slice(1);

  const visibleProducts = useMemo(() => {
    return products.filter(product => product.category === productsType);
  }, [products, productsType]);

  const countVisibleProducts = visibleProducts.length;

  useEffect(() => {
    // Включаем загрузку при смене категории
    setIsLoading(true);

    // Эмуляция загрузки данных с сервера
    setTimeout(() => {
      setIsLoading(false); // Останавливаем загрузку через 2 секунды (здесь может быть реальная загрузка данных)
    }, 1000);

    // Сбрасываем сортировку, когда меняется тип продуктов
    setSortBy('Newest');
    setItemsPerPage('All');
  }, [productsType]);

  const totalPages =
    itemsPerPage === 'All'
      ? 1
      : Math.ceil(countVisibleProducts / Number(itemsPerPage));

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const startIndex = (currentPage - 1) * Number(itemsPerPage);
  const currentItems =
    itemsPerPage === 'All'
      ? visibleProducts
      : visibleProducts.slice(startIndex, startIndex + Number(itemsPerPage));

  return (
    <div className="productPage">
      {isLoading ? (
        <Loader /> // Показываем Loader, если данные ещё загружаются
      ) : (
        <>
          <Breadcrumbs productType={normalizeProductsType!} />
          {/* Как здесь можно переделать с undefind */}

          <h1 className="productPage__title">{normalizeProductsType}</h1>

          <span className="productPage__description">
            {`${countVisibleProducts} ${countVisibleProducts === 1 ? 'model' : 'models'
              }`}
          </span>

          <div className="productPage__dropdown-container">
            <Dropdown
              label="Sort by"
              selected={sortBy}
              options={['Newest', 'Alphabetically', 'Cheapest']}
              onChange={value => setSortBy(value)}
              className="productPage__dropdown--sortBy"
              width="176px"
            />
            <Dropdown
              label="Items on page"
              selected={itemsPerPage}
              options={['4', '8', '16', 'All']}
              onChange={value => {
                setItemsPerPage(value);
                setCurrentPage(1); // сбрасываем на первую страницу при смене количества карточек
              }}
              className="productPage__dropdown--itemsOnPage"
              width="128px"
            />
          </div>

          <ProductsList products={currentItems} displayType={'with-discount'} />

          {itemsPerPage !== 'All' && totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange} // Передаем функцию обработки изменения страницы
            />
          )}
        </>
      )}
    </div>
  );
};
