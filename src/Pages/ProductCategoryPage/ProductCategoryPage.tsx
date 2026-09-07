import React, { useEffect, useRef, useState } from 'react';
import style from './ProductCategoryPage.module.scss';
import { Navigate, useParams, useSearchParams } from 'react-router-dom';
import { AllProductsType } from '../../types/AllProductsType';
import { usePagination } from '../../components/hooks/usePagination';
import { ProductCard } from '../../components/ProductCard';
import { LocationNav } from '../../LocationNav';
import { Dropdown } from '../../components/Dropdown';
import { Pagination } from '../../components/Pagination';

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
    if (!category || !validCategories.includes(category)) {
      return;
    }

    fetch('api/products.json')
      .then(res => res.json())
      .then((data: AllProductsType[]) => {
        const filteredProducts = data.filter(
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
      });
  }, [category, sort, page, perPage]);

  if (!category || !validCategories.includes(category)) {
    return <Navigate to="/not-found" />;
  }

  return (
    <div className={style.categoryPage}>
      <LocationNav />

      <div className={style.titleModelsBlock}>
        <div className={style.categoryTitle}>{categoryTitles[category]}</div>
        <p className={style.mainText}>{totalModels} models</p>
      </div>

      <Dropdown
        perPage={perPage}
        updatePerPage={updatePerPage}
        sort={sort}
        updateSort={updateSort}
      />

      <div className={style.categoryModels}>
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            showDiscount={product.year < 2021}
          />
        ))}
      </div>

      <Pagination
        totalItems={totalModels}
        perPage={perPage}
        currentPage={page}
        onPageChange={updatePage}
      />
    </div>
  );
};
