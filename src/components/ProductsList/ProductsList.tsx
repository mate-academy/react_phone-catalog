import { useSearchParams } from 'react-router-dom';
import { NoResults } from '../NoResults/NoResults';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import { Dropdown } from '../Dropdown/Dropdown';
import { Pagination } from '../Pagination/Pagination';
import './ProductList.scss';

type Props = {
  title: string
  products: Product[]
};

const optionsSort = ['newest', 'alphabetically', 'price', 'all'];
const optionsPage = ['4', '8', '16', 'all'];

export const ProductsList: React.FC<Props> = ({ title, products }) => {
  const [searchParams] = useSearchParams();

  const productsAmount = products.length;

  const currentPage = Number(searchParams.get('page')) || 1;
  const sort = searchParams.get('sort') || '';
  const perPage = Number(searchParams.get('perPage')) || productsAmount;
  const query = searchParams.get('query') || '';

  const getSortedProducts = (productsList: Product[]) => {
    let sortedProducts = [...productsList];

    if (sort === 'age') {
      sortedProducts = sortedProducts.sort(
        (product1, product2) => product1.age - product2.age,
      );
    }

    if (sort === 'name') {
      sortedProducts = sortedProducts.sort(
        (product1, product2) => product1.name.localeCompare(product2.name),
      );
    }

    if (sort === 'price') {
      sortedProducts = sortedProducts.sort(
        (product1, product2) => product1.price - product2.price,
      );
    }

    if (query) {
      const queryFilter = (param?: string | null) => {
        return param
          ? param.toLowerCase().includes(query.toLowerCase())
          : null;
      };

      sortedProducts = sortedProducts.filter(
        product => queryFilter(product.name),
      );
    }

    return sortedProducts || null;
  };

  const lastPage = Math.ceil(productsAmount / +perPage);

  const start = currentPage * perPage - perPage;
  const end = currentPage * perPage <= productsAmount
    ? currentPage * perPage
    : productsAmount;

  const sortedProducts = getSortedProducts(products).slice(start, end);

  return (
    <div className="product-list">
      <div className="product-list__container">
        <h1 className="product-list__title">{title}</h1>
        <p className="product-list__count">{`${productsAmount} models`}</p>
        {productsAmount === 0 ? (
          <NoResults />
        ) : (
          <>
            <div className="product-list__dropdowns">
              <Dropdown
                dropdownList={optionsSort}
                defaultValue="Choose an option"
                label="Sort by"
                searchParamsKey="sort"
              />
              <Dropdown
                dropdownList={optionsPage}
                defaultValue="All"
                label="Items on page"
                searchParamsKey="perPage"
              />
            </div>

            <div className="product-list__products">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
        <div className="product-list__pagination">
          {perPage !== productsAmount && lastPage > 1 && (
            <Pagination
              productsAmount={productsAmount}
              perPage={perPage}
              currentPage={currentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};
