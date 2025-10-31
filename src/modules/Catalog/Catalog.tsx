import { useContext } from 'react';
import { Product } from '../../api/types';
import { DataContext } from '../../context/ContextProvider';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import scss from './Catalog.module.scss';
import { ProductsList } from './components';
import { Loader } from '../shared/components/Loader';

interface Props {
  items: Product[];
  title: string;
}

export const Catalog: React.FC<Props> = ({ items, title }) => {
  const { isLoading } = useContext(DataContext);

  const amount = items.length;

  return (
    <div className={scss.catalog}>
      <Breadcrumbs page={title === 'Mobile phones' ? 'Phones' : title} />
      <h1 className={scss.catalog__title}>{title}</h1>
      <span className={scss.catalog__counter}>{`${amount} models`}</span>

      {isLoading ? (
        <Loader />
      ) : amount > 0 ? (
        <ProductsList items={items} />
      ) : (
        <p className={scss.catalog__empty}>
          There are no {title.toLowerCase()} yet
        </p>
      )}
    </div>
  );
};
