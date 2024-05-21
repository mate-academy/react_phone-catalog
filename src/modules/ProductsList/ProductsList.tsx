import { useState } from 'react';
import { PerPage } from '../../utils/enums/perPage';
import { SortBy } from '../../utils/enums/sortBy';
import { SortVariants } from '../../utils/enums/sortVariants';
import { Product } from '../../utils/types/Product';
import { Container } from '../Container';
import { Products } from './Products/Products';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Filter } from '../Filter/Filter';
import { Pagination } from './Pagination';
import { BreadCrumbs } from '../BreadCrumbs/BreadCrumbs';

type Props = {
  data: Product[] | undefined;
  title: string;
};

export const ProductsList: React.FC<Props> = ({ data, title }) => {
  const location = useLocation();

  const [urlParams] = useSearchParams(location.search);

  const initialPage = +(urlParams.get('page') ?? 1);

  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  const PHONES_PER_PAGE_PARAMS =
    urlParams.get(SortVariants.perPage) || PerPage.Four;

  const DATA_LENGTH = data?.length;

  const getDataSorted = (initialData: Product[]): Product[] => {
    const copyData = [...initialData];

    const getSortParams = urlParams.get(SortVariants.sortBy);

    switch (getSortParams) {
      case SortBy.Cheapest:
        return copyData.sort((a, b) => a.price - b.price);
      case SortBy.Alphabetically:
        return copyData.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return copyData.sort((a, b) => b.year - a.year);
    }
  };

  const detectPhonesPerPage = (pageData: PerPage): number => {
    switch (pageData) {
      case PerPage.All:
        return DATA_LENGTH as number;
      default:
        return pageData;
    }
  };

  const preparedData = getDataSorted(data || []);

  const PHONES_PER_PAGE: number = detectPhonesPerPage(
    PHONES_PER_PAGE_PARAMS as number,
  );

  const LAST_PAGE_INDEX = currentPage * PHONES_PER_PAGE;

  const FIRST_PAGE_INDEX = LAST_PAGE_INDEX - PHONES_PER_PAGE;

  const CURRENT_PAGE = preparedData.slice(FIRST_PAGE_INDEX, LAST_PAGE_INDEX);

  const AMOUNT_OF_PAGES = Math.ceil((DATA_LENGTH as number) / PHONES_PER_PAGE);

  return (
    <div className="ProductsList">
      <BreadCrumbs title={title} />
      <Container>
        <h5>{DATA_LENGTH} models</h5>
        <Filter />
        <Products data={CURRENT_PAGE} />
        {AMOUNT_OF_PAGES > 1 && (
          <Pagination pages={AMOUNT_OF_PAGES} setCurrentPage={setCurrentPage} />
        )}
      </Container>
    </div>
  );
};
