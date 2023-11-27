import { filterProducts } from '@helpers/filters';
import { Product } from '@typings/product';
import { ProductsList } from '@components/ProductsList';
import './Search.scss';

type SearchProps = {
  query: string;
  products: Product[];
};

export const Search = ({ query, products }: SearchProps) => {
  const queredProducts = filterProducts(products, query);
  const productsNum = queredProducts.length;

  return (
    <section className="search-results">
      {productsNum > 0 ? (
        <>
          <p className="search-results__count">{`${productsNum} results`}</p>
          <ProductsList products={queredProducts} />
        </>
      ) : (
        <h1 className="search-results__title">No Search Results</h1>
      )}
    </section>
  );
};
