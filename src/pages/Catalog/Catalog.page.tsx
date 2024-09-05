import { Navigate, useParams } from 'react-router-dom';
import { Icon } from '../../components/base/Icon/Icon.component';
import { StatesContext } from '../../store/GlobalStateProvider';
import { useContext } from 'react';
// eslint-disable-next-line max-len
import { ProductCard } from '../../components/base/ProductCard/ProductCard.component';

export const CatalogPage: React.FC = () => {
  const { category: categoryId } = useParams();
  const { categories } = useContext(StatesContext);
  const category = categories.find(cat => cat.id === categoryId);

  return !category ? (
    <Navigate to="/home" />
  ) : (
    <section className="catalog-page">
      <article className="catalog-page__path">
        <Icon iconType="home" iconUse="button" iconSize="16" />
        <Icon
          iconType="chevron-right"
          iconUse="button"
          iconSize="16"
          disabled={true}
        />
        <span className="catalog-page__path-name">
          {category.id.toUpperCase()}
        </span>
      </article>
      <article className="catalog-page__title">
        <h1>{category.title}</h1>
        <span>{category.productsCount} models</span>
      </article>
      <article className="catalog-page__products">
        {category.products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            showDiscount={false}
          />
        ))}
      </article>
    </section>
  );
};
