import { ProductBase } from '../../../types/ProductBase';
import { ProductCard } from '../../ProductCard/ProductCard';
import './CatalogList.scss';

interface Props {
  products: ProductBase[];
}

export const CatalogList: React.FC<Props> = ({ products }) => {
  return (
    <div className="catalogList">
      <div className="catalogList__grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
