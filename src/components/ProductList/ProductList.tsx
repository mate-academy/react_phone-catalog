import './ProductList.scss';
import { useLocation, useSearchParams } from 'react-router-dom';
import { ProductCard } from '../ProductCard';
import { Pagination } from '../Pagination';
import { ListControls } from '../ListControls';
import { Product } from '../../types/product';

type Props = {
  products: Product[];
};

export const ProductList: React.FC<Props> = ({ products }) => {
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const perPage = searchParams.get('perPage') || 'all';
  const page = +(searchParams.get('page') || 1);
  const paginationButtons = [];

  const paginationCount = perPage === 'all'
    ? 0
    : Math.ceil(products.length / +perPage);

  for (let i = 1; i <= paginationCount; i += 1) {
    paginationButtons.push(i);
  }

  function getPreparedProducts() {
    if (perPage === 'all') {
      return products;
    }

    const itemsOnPage = +perPage;

    return [...products]
      .splice(((page * itemsOnPage) - itemsOnPage), itemsOnPage);
  }

  const preparedProducts = getPreparedProducts();

  return (
    <section className="product-list" data-cy="productList">
      {pathname !== '/favorite' && <ListControls />}

      <div className="product-list__items">
        {preparedProducts.map(item => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>

      {paginationButtons.length > 1 && (
        <Pagination paginationButtons={paginationButtons} />
      )}
    </section>
  );
};
