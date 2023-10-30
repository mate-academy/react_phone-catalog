/* eslint-disable no-nested-ternary */
import { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ThreeCircles } from 'react-loader-spinner';
import { GlobalContext } from '../Context/GlobalContext';
import { PageProducts } from '../components/PageProducts/PageProducts';
import { Pagination } from '../components/Pagination/Pagination';
import { Product } from '../types/Product';
import { ICONS } from '../icons';
import { DropDownMenu } from '../components/DropDownMenu/DropDownMenu';
import '../style/PhonePage.scss';
import '../style/PageNavigation.scss';
import '../utils/variables.scss';
import { inlineStyles } from '../utils/inlineStyles';

function getItems(
  listOfItems: Product[],
  itemNumbers: string,
): Product[][] {
  const result = [];
  let itemsPart = [];
  let count = 0;

  for (let i = 0; i < listOfItems.length; i += 1) {
    if (i === listOfItems.length - 1) {
      itemsPart.push(listOfItems[i]);
      result.push(itemsPart);
      break;
    }

    itemsPart.push(listOfItems[i]);
    count += 1;

    if (count === +itemNumbers) {
      result.push(itemsPart);
      itemsPart = [];
      count = 0;
    }
  }

  return result;
}

const SORTBY = [
  {
    id: 'age',
    title: 'Newest',
  },
  {
    id: 'name',
    title: 'Alphabetically',
  },
  {
    id: 'price',
    title: 'Cheapest',
  },
];

const ITEMSONPAGE = [
  {
    id: '4',
    title: '4',
  },
  {
    id: '8',
    title: '8',
  },
  {
    id: '16',
    title: '16',
  },
  {
    id: 'all',
    title: 'All',
  },
];

export const PhonePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [perPage, setPerPage] = useState<string>(ITEMSONPAGE[1].title);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortByValue, setSortByValue] = useState<string>(SORTBY[0].title);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const query = searchParams.get('query')?.toLocaleLowerCase() || '';
  const sortBy = searchParams.get('sort') || '';
  const { products, errorMessage } = useContext(GlobalContext);

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const handlePerPageChange = (item: { id: string, title: string }) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', '1');
    params.set('perPage', item.title);
    setPerPage(item.title);
    setCurrentPage(1);
    setSearchParams(params);
  };

  const handlePage = (elem: number) => {
    setCurrentPage(elem);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  const setSortedParams = (item: { id: string, title: string }) => {
    const params = new URLSearchParams(searchParams);
    const sort = item.id;

    params.set('sort', sort);
    setSearchParams(params);
    setSortByValue(item.title);
  };

  const getSortedProducts = () => {
    let updatedState: Product[] = [...products];

    switch (sortBy) {
      case 'name':
        updatedState.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case 'price':
        updatedState.sort((a, b) => a.fullPrice - b.fullPrice);
        break;

      default:
        updatedState.sort((a, b) => b.year - a.year);
    }

    if (query) {
      updatedState = updatedState
        .filter(item => item.name
          .toLocaleLowerCase()
          .includes(query));
    }

    return updatedState;
  };

  const sortedProducts = getSortedProducts();
  const totalPages = Math.ceil(sortedProducts.length / +perPage);
  const groupedItems = getItems(sortedProducts, perPage);
  const currentGroupOfItems = groupedItems[currentPage - 1];

  return (
    <div className="phones-page">
      <div className="page-navigation">
        <div className="page-navigation_address">
          <a href="/" className="page-navigation_link">
            <img src={ICONS.iconHome} alt="Icon home" />
          </a>
          <img src={ICONS.arrowRignt} alt="Arrow right" />
          <p
            className="small-text-style"
            style={{ color: inlineStyles.colors.secondaryColor }}
          >
            Phones
          </p>
        </div>
        <div className="page-navigation_box">
          <h1 className="phones-page_title page-title-style">Mobile phones</h1>
          <p
            className="body-text-style"
            style={{ color: inlineStyles.colors.secondaryColor }}
          >
            {`${sortedProducts.length} numbers`}
          </p>
        </div>
      </div>
      <div className="phones-page_sort-box">
        <div className="dd-sort-box">
          <DropDownMenu
            title="Sort by"
            items={SORTBY}
            sortBy={sortByValue}
            setSortBy={setSortedParams}
          />
        </div>
        <div className="dd-items-box">
          <DropDownMenu
            title="Items on page"
            items={ITEMSONPAGE}
            sortBy={perPage}
            setSortBy={handlePerPageChange}
          />
        </div>
      </div>
      {isLoading ? (
        <div className="loader">
          <ThreeCircles
            height="70"
            width="70"
            color="#89939a"
            ariaLabel="three-circles-rotating"
          />
        </div>
      ) : errorMessage ? (
        <div className="phones-page_no-result">
          <h1 className="empty-pages_title page-title-style">
            Unfortunately, products couldn&apos;t be
            <br />
            loaded.
          </h1>
        </div>
      ) : sortedProducts.length > 0 ? (
        <>
          <div className="products-wrapp">
            <PageProducts items={currentGroupOfItems} />
          </div>
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePage}
              perPage={perPage}
            />
          )}
        </>
      ) : (
        <div className="phones-page_no-result">
          <h1 className="empty-pages_title page-title-style">
            Unfortunately, we couldn&apos;t find any items
            <br />
            that match your request.
          </h1>
        </div>
      )}
    </div>
  );
};
