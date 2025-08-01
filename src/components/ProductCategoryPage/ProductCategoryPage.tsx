
import './productCategoryPage.scss';
import { useEffect, useState } from 'react';
import { useParams, Navigate, useSearchParams } from 'react-router-dom';

import { BreadcrumbsNav } from '../BreadcrumbsNav';
import { ProductCard } from '../ProductCard';
import { AllProductsType } from '../../types/AllProductsType';
import { Dropdown } from '../Dropdown';

const validCategories = ['phones', 'tablets', 'accessories'];

const categoryTitles: Record<string, string> = {
  phones: 'Mobile Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

export const ProductCategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();

  const [products, setProducts] = useState<AllProductsType[]>([]);
  const [totalModels, setTotalModels] = useState(0);

  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get('sort');

  useEffect(() => {
    if (!category || !validCategories.includes(category)) return;

    fetch('/api/products.json')
      .then(res => res.json())
      .then((data: AllProductsType[]) => {
        const filteredProducts = data.filter(
          product => product.category === category,
        );

        if (sortBy === 'name') {
          filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === 'age') {
          filteredProducts.sort((a, b) => b.year - a.year);
        } else if (sortBy === 'price') {
          filteredProducts.sort((a, b) => a.price - b.price);
        }

        setProducts(filteredProducts);
        setTotalModels(filteredProducts.length);
      })
      .catch(err => console.error('Ошибка загрузки продуктов:', err));
  }, [category, sortBy]);

  if (!category || !validCategories.includes(category)) {
    // Можно заменить на свой компонент 404 или редирект
    return <Navigate to="/not-found" />;
  }

  return (
    <div className="category-page">
      <BreadcrumbsNav />

      <Dropdown />

      <div className="title-models-block">
        <div className="category-title">{categoryTitles[category]}</div>

        <p className="main-body-text-14">{totalModels} models</p>
      </div>

      <div className="category-models">
        {products.map(product => (
          <ProductCard key={product.id} product={product} showDiscount={product.year < 2021 ? true : false} />
        ))}
      </div>
    </div>
  );
};
