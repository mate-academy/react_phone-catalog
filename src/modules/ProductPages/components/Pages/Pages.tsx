import cn from 'classnames';
import pagesClass from './pages.module.scss';
import { ProductList } from '../ProductList';
import { SortBar } from '../SortBar';
import { PaginationPage } from '../PaginationPage';

export const Pages = () => {
  return (
    <div className={cn(pagesClass.pages)}>
      <div className={cn(pagesClass['pages__search-sortBar'])}>
        <SortBar />
      </div>

      <div className={cn(pagesClass.pages__items)}>
        <ProductList />
      </div>

      <div className={cn(pagesClass.pages__pagination)}>
        <PaginationPage />
      </div>
    </div>
  );
};
