import './SearchPage.scss';
import { useState, useCallback, useEffect } from 'react';
import debounce from 'lodash.debounce';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import Card from '../Card/Card';
import Loader from '../Loader/Loader';
import EmptyModal from '../EmptyModal/EmptyModal';

type Props = {
  products: Product[];
};

const Search: React.FC<Props> = ({ products }) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFilterProducts = useCallback(
    debounce((currQuery: string) => {
      setIsLoading(true);

      if (!currQuery.length) {
        setFilteredProducts([]);
        setIsLoading(false);

        return;
      }

      const reg = new RegExp(`${currQuery}.+$`, 'i');

      const filtered = products.filter(product => {
        return product.name.search(reg) !== -1;
      });

      setFilteredProducts(filtered);
      setIsLoading(false);
    }, 500),
    [products],
  );

  useEffect(() => {
    setIsLoading(true);
    handleFilterProducts(query);
  }, [query, handleFilterProducts]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="page__section search">
      <div className="container">
        <span className="search__count">
          {filteredProducts.length
            ? `${filteredProducts.length} results`
            : <EmptyModal />}
        </span>

        <ul className="search__list">
          {filteredProducts.map(product => (
            <li key={product.id} className="search__item">
              <Card product={product} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Search;
