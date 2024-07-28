import style from './CatalogPage.module.scss';
import home from '../../assets/img/icons/home-icon.svg';
import rightArrow from '../../assets/img/icons/arrow-right.svg';
import { Dropdown } from '../../components/Dropdown';
import { ProductCard } from '../../components/ProductCard';
import { useContext, useState } from 'react';
// import { getData } from '../../assets/services/httpClient';
import { Product } from '../../types/Product';
import { SortType } from '../../types/SortType';
import { ProductContext } from '../../store/ProductProvider';

type Props = {
  category: 'phones' | 'tablets' | 'accessories';
};

const getSortedList = (sortingArray: Product[], sortParams: SortType) => {
  switch (sortParams) {
    case SortType.ALPHABETICALLY:
      return [...sortingArray].sort((a, b) => a.name.localeCompare(b.name));

    case SortType.PRICE:
      return [...sortingArray].sort((a, b) => a.price - b.price);

    default:
      return [...sortingArray].sort((a, b) => b.year - a.year);
  }
};

export const CatalogPage: React.FC<Props> = ({ category }) => {
  const [sortBy] = useState<SortType>(SortType.NEWEST);
  const { products } = useContext(ProductContext);

  const visibleList = getSortedList(products, sortBy).filter(
    item => item.category === category,
  );

  return (
    <div className={style.catalogPage}>
      <div className={style.path}>
        <a href="/" className={style.path__link}>
          <img src={home} className={style.path__home} />
        </a>
        <img src={rightArrow} className={style.path__arrow} />
        <a href="#/phones" className={style.path__direction}>
          Phones
        </a>
      </div>
      <h1 className={style.title}>
        {category === 'phones' ? 'mobile phones' : category}
      </h1>
      <p className={style.countModels}>{visibleList.length} models</p>
      <div className={`${style.sortField} ${style['sortField--1']}`}>
        <Dropdown dropdownName={'sortBy'} />
      </div>
      <div className={`${style.sortField} ${style['sortField--2']}`}>
        <Dropdown dropdownName={'itemsOnPage'} />
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
