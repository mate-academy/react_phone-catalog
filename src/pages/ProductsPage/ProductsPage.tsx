/* eslint-disable @typescript-eslint/indent */
/* eslint max-len: "off" */
import './ProductsPage.scss';
import { useEffect, useRef, useState } from 'react';
import { ProductCard } from '../HomePage/ProductCard';
import { Breadcrumbs } from './Breadcrumbs';
import { ProductsType } from '../../types/ProductsType';
import { Navigate, useParams, useSearchParams } from 'react-router-dom';
import { usePagination } from '../../hooks/usePagination';
import { Dropdown } from './Dropdown';
import { PaginationControls } from './PaginationControls';
import { SkeletonProductCard } from '../../components/Skeletons/SkeletonProductCard/SkeletonProductCard';

const validCategories = ['phones', 'tablets', 'accessories'];

const categoryTitle: Record<string, string> = {
  phones: 'Mobile Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

export const ProductsPage = () => {
  const { category } = useParams<{ category: string }>();
  const { page, perPage, sort, updatePage, updatePerPage, updateSort } =
    usePagination();
  const [products, setProducts] = useState<ProductsType[]>([]);
  const [totalModels, setTotalModels] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

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

    setIsLoading(true);

    fetch('api/products.json')
      .then(res => res.json())
      .then((data: ProductsType[]) => {
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
        setIsLoading(false);
      });
  }, [category, sort, page, perPage]);

  if (!category || !validCategories.includes(category)) {
    return <Navigate to="/not-found" />;
  }

  return (
    <div className="productsPage">
      <Breadcrumbs />
      <div className="category">
        <h2 className="category__title">{categoryTitle[category]}</h2>
        <p className="category__total">{totalModels} models</p>
      </div>

      <Dropdown
        perPage={perPage}
        updatePerPage={updatePerPage}
        sort={sort}
        updateSort={updateSort}
      />

      <div className="products__models">
        {isLoading
          ? Array.from({ length: perPage }).map((_, index) => (
              <SkeletonProductCard key={index} />
            ))
          : products.map(product => (
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
