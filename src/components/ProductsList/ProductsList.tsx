import { SingleValue } from 'react-select';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../ProductCard';
import { getSearchWith } from '../../helpers/searchHelper';
import { SelectOption } from '../../types/SelectOption';
import { Product } from '../../types/Product';
import { Pagination } from '../Pagination';
import { SelectItem } from '../Select';
import { NoResults } from '../NoResults';
import { Breadcrumbs } from '../Breadcrumbs';
import { calculatePrice } from '../../helpers/different';
import './ProductsList.scss';

type Props = {
  products: Product[],
  title: string,
  isFavorites?: boolean,
};

export const ProductsList: React.FC<Props> = ({
  products, title, isFavorites,
}) => {
  const optionsSort = [
    { value: 'age', label: 'Newest' },
    { value: 'name', label: 'Alphabetically' },
    { value: 'price', label: 'Cheapest' },
  ];

  const optionsPerPage = [
    { value: '4', label: '4' },
    { value: '8', label: '8' },
    { value: '16', label: '16' },
    { value: 'all', label: 'All' },
  ];

  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const perPage = searchParams.get('perPage') || 4;
  const page = searchParams.get('page') || 1;
  const query = searchParams.get('query') || '';

  const filteredProducts = products.filter(product => (
    product.name.toLowerCase().replace(/\s+/g, '').includes(query)
  ));
  const totalCount = filteredProducts.length;
  const countItems = perPage === 'all' ? totalCount : perPage;
  const offset = +countItems * (+page - 1);
  const pageCount = Math.ceil(totalCount / +countItems);
  const defaultValueSort = optionsSort
    .find(option => option.value === sort);
  const defaultValuePerPage = optionsPerPage
    .find(option => option.value === perPage);
  const hidePerPage = totalCount <= +optionsPerPage[0].value || isFavorites;
  const hidePagination = pageCount <= 1 || hidePerPage;

  const sortedProducts = [...filteredProducts].sort((p1, p2) => {
    switch (sort) {
      case 'age':
        return p1.age - p2.age;

      case 'name':
        return p1.name.localeCompare(p2.name);

      case 'price':
        return (
          calculatePrice(p1.price, p1.discount)
          - calculatePrice(p2.price, p2.discount)
        );

      default:
        return 0;
    }
  });

  const productsOnPage = isFavorites
    ? filteredProducts
    : sortedProducts.slice(offset, +countItems + offset);

  const handleOnChangeSort = (selectedOption: SingleValue<SelectOption>) => (
    setSearchParams(
      getSearchWith(searchParams, { sort: selectedOption?.value || null }),
    )
  );

  const handleOnChangePerPage = (selectedOption: SingleValue<SelectOption>) => {
    if (selectedOption?.value) {
      if ((+selectedOption.value * +page) > totalCount
        || selectedOption.value === 'all') {
        setSearchParams(
          getSearchWith(searchParams, {
            perPage: selectedOption.value,
            page: null,
          }),
        );

        return;
      }
    }

    setSearchParams(
      getSearchWith(
        searchParams, { perPage: selectedOption?.value || null },
      ),
    );
  };

  return (
    <section
      className="products-list"
      data-cy="productList"
    >
      <div className="main-container">
        {totalCount > 0
          ? (
            <>
              <Breadcrumbs
                type={isFavorites ? 'favorites' : products[0].type}
              />

              <h1 className="products-list__title">
                {title}
              </h1>

              <div className="products-list__subtitle">
                {`${totalCount} models`}
              </div>

              {!isFavorites && (
                <SelectItem
                  placeholder="Sort by..."
                  defaultValue={defaultValueSort}
                  options={optionsSort}
                  onChange={handleOnChangeSort}
                  selectTitle="Sort by"
                />
              )}

              {!hidePerPage && (
                <SelectItem
                  placeholder={`${perPage}`}
                  defaultValue={defaultValuePerPage}
                  options={optionsPerPage}
                  onChange={handleOnChangePerPage}
                  selectTitle="Items on page"
                  classModificator="select-container--less"
                />
              )}

              <section className="products-list__items">
                {productsOnPage.map(product => (
                  <ProductCard
                    product={product}
                    key={product.id}
                  />
                ))}
              </section>
            </>
          )
          : (<NoResults text={`${title} Not Found`} />)}

        {!hidePagination && (
          <Pagination
            pageCount={pageCount}
          />
        )}
      </div>
    </section>
  );
};
