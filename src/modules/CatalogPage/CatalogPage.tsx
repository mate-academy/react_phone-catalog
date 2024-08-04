import style from './CatalogPage.module.scss';
import { Dropdown } from '../../components/Dropdown';
import { ProductCard } from '../../components/ProductCard';
import { useContext, useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { ProductContext } from '../../store/ProductProvider';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { useSearchParams } from 'react-router-dom';

type Props = {
  category: 'phones' | 'tablets' | 'accessories';
};

const getSortedList = (sortingArray: Product[], sortParams: string | null) => {
  switch (sortParams) {
    case 'Alphabetically':
      return [...sortingArray].sort((a, b) => a.name.localeCompare(b.name));

    case 'Cheapest':
      return [...sortingArray].sort((a, b) => a.price - b.price);

    default:
      return [...sortingArray].sort((a, b) => b.year - a.year);
  }
};

export const CatalogPage: React.FC<Props> = ({ category }) => {
  const [searchParams] = useSearchParams();
  const { products } = useContext(ProductContext);
  const sort = searchParams.get('sort' || '');
  const perPage = searchParams.get('perPage' || '');

  const [visibleList, setVisibleList] = useState<Product[]>([]);

  useEffect(() => {
    const sortedList = getSortedList(products, sort).filter(
      item => item.category === category,
    );

    if (perPage) {
      setVisibleList(sortedList.slice(0, +perPage));
    } else {
      setVisibleList(sortedList);
    }
  }, [category, perPage, sort, products]);

  return (
    <div className={style.catalogPage}>
      <div className={style.breadcrumbs}>
        <Breadcrumbs />
      </div>
      <h1 className={style.title}>
        {category === 'phones' ? 'mobile phones' : category}
      </h1>
      <p className={style.countModels}>{visibleList.length} models</p>
      <div className={`${style.sortField} ${style['sortField--1']}`}>
        <Dropdown dropdownName={'sort'} />
      </div>
      <div className={`${style.sortField} ${style['sortField--2']}`}>
        <Dropdown dropdownName={'perPage'} />
      </div>
      {!visibleList.length && (
        <h1 className={style.noData}>
          There are no phones/tablets/accessories yet
        </h1>
      )}
      <div className={style.cards}>
        {visibleList.map(prod => (
          <div key={prod.id} className={style.card}>
            <ProductCard prod={prod} />
          </div>
        ))}
      </div>
    </div>
  );
};
