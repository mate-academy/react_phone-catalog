import { useParams } from 'react-router-dom';

import { ProductPage } from '../../pages/ProductPage';
import { PageNotFound } from '../../pages/PageNotFound';

import { Category, CategoryEnum } from '../../types/CategoryTypes';

export const ProductPageWrapper = () => {
  const { category } = useParams<{ category: Category }>();

  const titles: Record<Category, string> = {
    phones: 'Mobile phones',
    tablets: 'Tablets',
    accessories: 'Accessories',
    favourites: 'Favourites',
  };

  const productsUrl = `${import.meta.env.BASE_URL}api/products.json`;

  if (
    !category ||
    !Object.values(CategoryEnum).includes(category as CategoryEnum)
  ) {
    return <PageNotFound />;
  }

  return (
    <ProductPage
      title={titles[category]}
      productsUrl={productsUrl}
      category={category}
    />
  );
};
