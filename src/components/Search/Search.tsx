import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { searchProducts } from '../../helpers/searchProducts';
import { ProductCard } from '../ProductCard';
import { NoResults } from '../NoResults';

type Props = {
  products: Product[],
  title: string,
};

export const Search: FC<Props> = ({ products, title }) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const foundItems = searchProducts(products, query);

  return (
    <section className="products-list__container">
      <div className="products-list__header">
        <h1 className="products-list__title">Search result</h1>
        <span className="products-list__qty">{`${foundItems.length} results`}</span>
      </div>

      {foundItems.length > 0 ? (
        <>
          <div className="products-list__main-content" data-cy="productList">
            <ul className="grid" data-cy="cardsContainer">
              {foundItems.map((product, index) => (
                <ProductCard product={product} key={product.id} index={index} />
              ))}
            </ul>
          </div>
        </>
      ) : (
        <NoResults title={title} />
      )}
    </section>
  );
};
