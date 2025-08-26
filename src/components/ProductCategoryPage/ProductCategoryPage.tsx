import './productCategoryPage.scss';
import { usePagination } from '../../hooks/usePagination';
import { useEffect, useRef, useState } from 'react';
import { useParams, Navigate, useSearchParams } from 'react-router-dom';

import { BreadcrumbsNav } from '../BreadcrumbsNav';
import { ProductCard } from '../ProductCard';
import { AllProductsType } from '../../types/AllProductsType';
import { Dropdown } from '../Dropdown';
import { PaginationControls } from '../PaginationControls/PaginationControls';

const validCategories = ['phones', 'tablets', 'accessories'];

const categoryTitles: Record<string, string> = {
  phones: 'Mobile Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

export const ProductCategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const { page, perPage, sort, updatePage, updatePerPage, updateSort } =
    usePagination(category);

  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState<AllProductsType[]>([]);
  const [totalModels, setTotalModels] = useState(0);

  const prevCategoryRef = useRef(category);

  useEffect(() => {
    const prev = prevCategoryRef.current;

    if (prev !== category) {
      searchParams.set('page', '1');
      setSearchParams(searchParams);
      prevCategoryRef.current = category;
    }
  }, [category, searchParams, setSearchParams]);


  useEffect(() => {
    if (!category || !validCategories.includes(category)) return ;

    fetch('/api/products.json')
      .then(res => res.json())
      .then((data: AllProductsType[]) => {
        let filteredProducts = data.filter(
          product => product.category.toLowerCase() === category.toLowerCase(),
        );

        if (sort === 'name') {
          filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sort === 'age') {
          filteredProducts.sort((a, b) => b.year - a.year);
        } else if (sort === 'price') {
          filteredProducts.sort((a, b) => a.price - b.price);
        }

        setTotalModels(filteredProducts.length);

        const startIndex = (page - 1) * perPage;
        const endIndex = startIndex + perPage;
        const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

        setProducts(paginatedProducts);
      })
      .catch(err => console.error('Ошибка загрузки продуктов:', err));
  }, [category, sort, page, perPage]);

  if (!category || !validCategories.includes(category)) {
    return <Navigate to="/product-not-found" />;
  }

  return (
    <div className="category-page">
      <BreadcrumbsNav />

      <div className="title-models-block">
        <div className="category-title">{categoryTitles[category]}</div>
        <p className="main-body-text-14">{totalModels} models</p>
      </div>

      <Dropdown
        perPage={perPage}
        updatePerPage={updatePerPage}
        sort={sort}
        updateSort={updateSort}
      />

      <div className="category-models">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            showDiscount={product.year < 2021}
          />
        ))}
      </div>

      <PaginationControls
        totalItems={totalModels}
        perPage={perPage}
        currentPage={page}
        onPageChange={updatePage}
      />
    </div>
  );
};
