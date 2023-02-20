import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';

type Props = {
  sortedProducts: Product[],
  page: string | null,
  itemsPerPage: string | null,
};

export const ProductsList: React.FC<Props> = ({
  sortedProducts,
  page,
  itemsPerPage,
}) => {
  return (
    <ul data-cy="productList" className="productsCatalog__catalog">
      {sortedProducts.slice(
        (!page
          ? 0
          : (+page - 1) * (!itemsPerPage ? 16 : +itemsPerPage)),
        (itemsPerPage === 'all'
          ? sortedProducts.length
          : (itemsPerPage ? +itemsPerPage : 16) * (!page ? 1 : +page)),
      )
        .map(product => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
    </ul>
  );
};
