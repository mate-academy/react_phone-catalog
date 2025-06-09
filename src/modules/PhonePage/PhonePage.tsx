import { useAppSelector } from '../../app/hooks';
import { ProductCart } from '../../components/cardItem/ProductCart';
import { Container } from '../../components/container/Container';
import { Filter } from '../../components/filter/Filter';
import { Pagination } from '../../components/pagination/Pagination';
import { ControlPagination } from '../../components/paginationControl/ControlPagination';
import { ProductList } from '../../components/ProductsList/ProductsList';
import { TitlePages } from '../../components/title/TitlePages';
import { PageNav } from './components/pageNav/PageNav';

export const PhonePage = () => {
  return (
    <>
      <Container>
        <PageNav />
        <TitlePages type={'phones'} />


        <ProductList />
</Container>

    </>
  );
};
