import { FC, useEffect, useState } from 'react';
import useSwr from 'swr';
import { BASE_URL, fetcher } from '../../api/productsApi';
import { useAppSelector } from '../../app/hooks';
import { Notification } from '../../components/Notification';
import { Pagination } from '../../components/Pagination';
import { PathContainer } from '../../components/PathContainer';
import { Products } from '../../components/Products';
import { SelectButton } from '../../components/SelectButton';
import { makeAnArrayByGivenLength } from '../../helpers/makeAnArrayByGivenLength';
import { Product } from '../../types/product';
import './productsPage.scss';

interface Props {
  category: string
}

export const ProductsPage: FC<Props> = ({ category }) => {
  const theme = useAppSelector(state => state.theme.value);
  const [totalItemsOnPage, setTotalItemsOnPage] = useState('16');
  const [sortBy, setSortBy] = useState('Newest');
  const [visibleItems, setVisibleItems] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const searchBar = useAppSelector(state => state.searchBar.value);
  const { data: products }: { data: Product[] } = useSwr(
    `${BASE_URL}.json`,
    fetcher,
    { suspense: true },
  );

  const handleSetCurrentPage = (page: number) => {
    setCurrentPage(page);
  };

  const handleArrowClick = (direction: string) => {
    if (direction === 'left') {
      setCurrentPage(currentPage => currentPage - 1);
    } else {
      setCurrentPage(currentPage => currentPage + 1);
    }
  };

  useEffect(() => {
    let correctedItems = [...products].sort((productA, productB) => {
      switch (sortBy) {
        case 'Newest':
          return productB.year - productA.year;

        case 'Cheapest':
          return productA.price - productB.price;

        case 'Name':
          return productB.name.localeCompare(productA.name);

        default:
          return 0;
      }
    }).filter(product => {
      const preparedProdName = product.name.toLowerCase().replace(/\s/g, '');
      const preparedSearchBar = searchBar.toLowerCase().split(' ');

      return preparedSearchBar
        .every((keyword) => preparedProdName
          .includes(keyword));
    });

    if (totalItemsOnPage !== 'All') {
      correctedItems = correctedItems
        .slice(Number(totalItemsOnPage) * (currentPage - 1), currentPage * Number(totalItemsOnPage));
    }

    if (searchBar.length) {
      setTotalItemsOnPage('All');
    }

    setVisibleItems(correctedItems);
  }, [sortBy, totalItemsOnPage, products, currentPage, searchBar]);

  return (
    <div className="products-page">
      <PathContainer pathArray={[category]} />

      {category === 'Phones' ? (
        <h1 className={`title title--${theme}`}>
          Mobile phones
        </h1>
      ) : (
        <h1 className={`title title--${theme}`}>
          {category}
        </h1>
      )}

      <p className="products-page__quantity">
        {`${visibleItems.length} models`}
      </p>

      {!visibleItems.length && !!searchBar.length ? (
        <Notification message={`There is no such a product as ${searchBar}`} />
      ) : (
        <>
          <div className="products-page__filter-wrapper">
            <div className="products-page__filter-button-container">
              <p className="products-page__filter-button__description">Sort by</p>

              <SelectButton
                currentOption={sortBy}
                setCurrentOption={setSortBy}
                options={['Newest', 'Name', 'Cheapest']}
              />
            </div>
            <div className="products-page__filter-button-container">
              <p className="products-page__filter-button__description">Items on page</p>

              <SelectButton
                currentOption={totalItemsOnPage}
                setCurrentOption={setTotalItemsOnPage}
                options={['4', '8', '16', 'All']}
              />
            </div>
          </div>

          <ul className="products-page__products">
            <Products products={visibleItems} />
          </ul>

          <div className="products-page__pagination">
            {(totalItemsOnPage !== 'All') && (
              <Pagination
                currentPage={currentPage}
                handleSetCurrentPage={handleSetCurrentPage}
                handleArrowClick={handleArrowClick}
                pages={makeAnArrayByGivenLength(Math.ceil(products.length / Number(totalItemsOnPage)))}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};
