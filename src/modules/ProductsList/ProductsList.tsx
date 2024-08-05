import { useState } from 'react';
import { PerPage } from '../../utils/enums/perPage';
import { SortBy } from '../../utils/enums/sortBy';
import { SortVariants } from '../../utils/enums/sortVariants';
import { Product } from '../../utils/types/Product';
import { Products } from './Products/Products';
import { useSearchParams } from 'react-router-dom';
import { Filter } from '../Filter/Filter';
import { Pagination } from './Pagination';
import { BreadCrumbs } from '../BreadCrumbs/BreadCrumbs';
import { Container } from '../Container';
import classNames from 'classnames';
import styles from './ProductsList.module.scss';

type Props = {
  data: Product[] | undefined;
  title: string;
};

export const ProductsList: React.FC<Props> = ({ data, title }) => {
  const [urlParams] = useSearchParams();

  const query = urlParams.get(SortVariants.query) || '';

  const initialPage = +(urlParams.get('page') ?? 1);

  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  const PHONES_PER_PAGE_PARAMS =
    urlParams.get(SortVariants.perPage) || PerPage.Four;

  const getDataSorted = (
    initialData: Product[],
    queryText: string,
  ): Product[] => {
    let copyData = [...initialData];

    const getSortParams = urlParams.get(SortVariants.sortBy);

    switch (getSortParams) {
      case SortBy.Cheapest:
        copyData = copyData.sort((a, b) => a.price - b.price);
        break;
      case SortBy.Alphabetically:
        copyData = copyData.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        copyData = copyData.sort((a, b) => b.year - a.year);
    }

    if (queryText) {
      const trimmedQuery = queryText.trim().toLowerCase();

      copyData = copyData.filter(item =>
        item.name.trim().toLowerCase().includes(trimmedQuery),
      );
    }

    return copyData;
  };

  const preparedData = getDataSorted(data || [], query);

  const DATA_LENGTH = preparedData?.length;
  const detectPhonesPerPage = (pageData: PerPage): number => {
    switch (pageData) {
      case PerPage.All:
        return DATA_LENGTH as number;
      default:
        return pageData;
    }
  };

  const PHONES_PER_PAGE: number = detectPhonesPerPage(
    PHONES_PER_PAGE_PARAMS as number,
  );

  const LAST_PAGE_INDEX = currentPage * PHONES_PER_PAGE;

  const FIRST_PAGE_INDEX = LAST_PAGE_INDEX - PHONES_PER_PAGE;

  const CURRENT_PAGE = preparedData.slice(FIRST_PAGE_INDEX, LAST_PAGE_INDEX);

  const AMOUNT_OF_PAGES = Math.ceil((DATA_LENGTH as number) / PHONES_PER_PAGE);

  return (
    <section>
      {AMOUNT_OF_PAGES ? (
        <>
          <BreadCrumbs title={title} />
          <h5>{DATA_LENGTH} models</h5>

          <Filter />

          <Products data={CURRENT_PAGE} />

          <div
            className={classNames({
              [styles.pagination_hide]: AMOUNT_OF_PAGES === 1,
            })}
          >
            <Pagination
              pages={AMOUNT_OF_PAGES}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </>
      ) : (
        <Container>
          <BreadCrumbs title={title} />
          <Filter />
          <h2>There are no {title.toLowerCase()} that match your criteria.</h2>
        </Container>
      )}
    </section>
  );
};
