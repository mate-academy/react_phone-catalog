import { FC, useState } from 'react';
import { Footer } from '../shared/components/Footer/Footer';
import { Header } from '../shared/components/Header';
import { CatalogHeader } from './components/CatalogHeader';
import { Title } from '../shared/components/Title';
import { CatalogOptions } from './components/CatalogOptions';
import { SortName } from '../../types/SortName';
import { Product } from '../../types/Product';
import { ItemsPerPage } from '../../types/itemsPerPage';
import { CatalogPagination } from './components/CatalogPagination';
import { useSearchParams } from 'react-router-dom';

type Props = {
  pathName: string;
  title: string;
  products: Product[];
};

export const CatalogPage: FC<Props> = ({ pathName, title, products }) => {
  const [sort, setSort] = useState<SortName>('age');

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState<ItemsPerPage>('16');

  const [isActivePage, setIsActivePage] = useState<number | null>(null);

  const sortedProducts = [...products].sort((a, b) => {
    switch (sort) {
      case 'age':
        return b.year - a.year;
      case 'title':
        return a.name.localeCompare(b.name);
      case 'price':
        return a.price - b.price;
      default:
        return;
    }
  });

  const amountPages =
    itemsPerPage !== 'all'
      ? Math.ceil(sortedProducts.length / Number(itemsPerPage))
      : 0;

  const pages = Array.from({ length: amountPages }, (_, index) => index + 1);

  const startIndex = (currentPage - 1) * Number(itemsPerPage);
  const endIndex = startIndex + Number(itemsPerPage);

  const [searchParams, setSearchParams] = useSearchParams();

  const handleSort = (value: string) => {
    setSort(value);
    searchParams.set('sort', value);
    setSearchParams(searchParams);
  };

  const handlePerPage = (value: string) => {
    setItemsPerPage(value);
    searchParams.set('perPage', value);
    setSearchParams(searchParams);
  };

  const handlePage = (value: number) => {
    setCurrentPage(value);
    searchParams.set('page', value);
    setSearchParams(searchParams);
  };

  const visibleProducts =
    itemsPerPage === 'all'
      ? [...sortedProducts]
      : [...sortedProducts].slice(startIndex, endIndex);

  return (
    <div className="page">
      <Header />
      <main className="main">
        <div
          className="container"
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}
        >
          <CatalogHeader pathName={pathName} />
          <Title title={title} />
          <CatalogOptions
            sort={sort}
            setSort={setSort}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            currentPage={currentPage}
            sortedProducts={sortedProducts}
            pages={pages}
            isActivePage={isActivePage}
            handleSort={handleSort}
            handlePerPage={handlePerPage}
          />
          <CatalogPagination
            pages={pages}
            isActivePage={isActivePage}
            setIsActivePage={setIsActivePage}
            handlePage={handlePage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};
