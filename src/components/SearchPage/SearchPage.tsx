import './SearchPage.scss';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import Card from '../Card/Card';

type Props = {
  products: Product[];
};

const Search: React.FC<Props> = ({ products }) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const foundedProduct = useMemo(() => {
    if (!query.length) {
      return [];
    }

    const reg = new RegExp(`${query}.+$`, 'i');

    return products.filter(product => {
      return product.name.search(reg) !== -1;
    });
  }, [query]);

  return (
    <section className="page__section search">
      <div className="container">
        <span className="search__count">
          {foundedProduct.length
            ? `${foundedProduct.length} results`
            : 'No found'}
        </span>

        <ul className="search__list">
          {foundedProduct.map(product => (
            <li key={product.name} className="search__item">
              <Card product={product} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Search;
