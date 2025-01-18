import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCategoryById } from '../../helpers/helpers';
import { Category } from '../../types/Category';
import { NavigationPath } from '../../components/NavigatiomPath/NavigationPath';
import { CategoryTitle } from '../../components/CategoryTitle/CategoryTitle';
import { CatalogGrid } from '../../components/CatalogGrid/CatalogGrid';
import { Loader } from '../../components/Loader/Loader';
export const CategoryPage = () => {
  const { category: categoryId } = useParams();
  const [category, setCategory] = useState<Category>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (categoryId) {
      setLoading(true);
      getCategoryById(categoryId)
        .then(catId => {
          setCategory(catId);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [categoryId]);

  if (loading) {
    return <Loader />;
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
