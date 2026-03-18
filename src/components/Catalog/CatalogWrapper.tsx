import { useParams } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';

interface CatalogWrapperProps {
  products: any[];
}

const CatalogWrapper: React.FC<CatalogWrapperProps> = ({ products }) => {
  const { category } = useParams<{ category: string }>();

  if (!category) {
    return <h2>No category provided</h2>;
  }

  if (products.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className="catalog">
      <h1 className="catalog-title">{category.toUpperCase()}</h1>

      <div className="catalog-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CatalogWrapper;
