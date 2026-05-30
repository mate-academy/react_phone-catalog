import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCategoryById } from '../../helpers/helpers';
import { Category } from '../../types/Category';
import { NavigationPath } from '../../components/NavigatiomPath/NavigationPath';
import { CategoryTitle } from '../../components/CategoryTitle/CategoryTitle';
import { CatalogGrid } from '../../components/CatalogGrid/CatalogGrid';
import { Loader } from '../../components/Loader/Loader';
import { NotFoundPage } from '../../components/NotFoundPage/NotFoundPage';

export const CategoryPage = () => {
  const { category: categoryId } = useParams();
  const [category, setCategory] = useState<Category>();
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (categoryId) {
      setLoading(true);
      getCategoryById(categoryId)
        .then(catId => {
          if (!catId) {
            setNotFound(true);
          } else {
            setCategory(catId);
            setNotFound(false);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [categoryId]);

  if (loading) {
    return <Loader />;
  }

  if (notFound) {
    return <NotFoundPage />;
  }

  return (
    category && (
      <section className="catalogPage">
        <NavigationPath firstLvl={category.title} />
        <CategoryTitle
          title={category.title}
          productsCount={category.products.length}
        />
        <CatalogGrid products={category.products} />
      </section>
    )
  );
};
