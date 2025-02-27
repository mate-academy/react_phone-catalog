import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getCategoryByName } from '../../services/categoryHelper';
import { Category } from '../../types/Category';
import { useGlobalState } from '../../hooks/hooks';
import { Catalogue } from '../../components/Catalogue';
import { PageNotFound } from '../PageNotFound';
import { Breadcrumb } from '../../components/Breadcrumb';
import { Loader } from '../../components/Loader';

import './CategoryPage.scss';
import '../../styles/container.scss';

export const CategoryPage = () => {
  const { categoryName } = useParams();
  const { products } = useGlobalState();
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const categoryProducts = [...products].filter(
    product => product.category === categoryName,
  );

  useEffect(() => {
    if (categoryName) {
      setIsLoading(true);
      getCategoryByName(categoryName)
        .then(category => {
          if (category) {
            setSelectedCategory(category);
            setNotFound(false);
          } else {
            setNotFound(true);
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, [categoryName]);

  if (isLoading) {
    return <Loader />;
  }

  if (notFound) {
    return <PageNotFound />;
  }

  return (
    selectedCategory && (
      <div className="category">
        <div className="container">
          <Breadcrumb firstLevel={selectedCategory.name} />
          <h2 className="category__title">{selectedCategory.title}</h2>
          <p className="category__subtitle">{categoryProducts.length} models</p>
          {!categoryProducts.length ? (
            <p>There are no {categoryName} yet</p>
          ) : (
            <Catalogue
              categoryProducts={categoryProducts}
              key={selectedCategory.name}
            />
          )}
        </div>
      </div>
    )
  );
};
