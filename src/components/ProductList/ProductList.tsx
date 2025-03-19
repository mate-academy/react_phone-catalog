import React, { useEffect, useMemo, useState } from 'react';
import { ProductCart } from '../ProductCart/ProductCart';
import { Product } from '@/types/Products';
import style from './ProductList.module.scss';
import homeIcon from '../../shared/icons/home.svg';
import rightIcon from '../../shared/icons/chevron-arrow-right.svg';
import { Dropdown } from '../DropdownList/Dropdown';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from '../HorizontalPagination/Pagination';

type Props = {
  proudct: Product[];
  categoryProduct: string;
};

enum DropDownTitle {
  sort = 'Sort by',
  itemOnPage = 'Items on page',
}

function sortMethod(
  prodcut: Product[],
  selectField: string,
  setSortedProduct: (product: Product[]) => void,
) {
  if (selectField === 'Newest') {
    setSortedProduct(prodcut.sort((a, b) => b.year - a.year));
    return;
  } else if (selectField === 'Alphabetically') {
    setSortedProduct(prodcut.sort((a, b) => a.name.localeCompare(b.name)));
    return;
  } else if (selectField === 'Cheapest') {
    setSortedProduct(prodcut.sort((a, b) => a.fullPrice - b.fullPrice));
    return;
  }
}

export const ProductList: React.FC<Props> = ({ proudct, categoryProduct }) => {
  const optionsSort = ['Newest', 'Alphabetically', 'Cheapest'];
  const optionViewOnPage = ['4', '8', '16', 'All'];

  const [sortedProduct, setSortedProduct] = useState<Product[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const initialSort = searchParams.get('sort');
  const initialView = searchParams.get('perPage');
  const initialPage = Number(searchParams.get('?page')) || 1;
  const [selected, setSelected] = useState(initialSort || optionsSort[0]);
  const [selectedView, setSelectedView] = useState(initialView || optionViewOnPage[3]);
  const [currentPage, setCurrentPage] = useState(initialPage);

  const choseCategory = useMemo(() => {
    return proudct.filter(item => item.category === categoryProduct);
  }, [proudct, categoryProduct]);

  useEffect(() => {
    const sorted = [...choseCategory];

    sortMethod(sorted, selected, setSortedProduct);

    setSearchParams({ sort: selected, page: currentPage.toString(), perPage: selectedView });
    setSortedProduct(sorted);
  }, [selected, choseCategory, setSearchParams, selectedView, currentPage]);

  let titleSection = 'Mobile phone';
  let descriptionSection = 'Phones';

  if (categoryProduct === 'tablets') {
    titleSection = 'Tablets';
    descriptionSection = 'Tablets';
  } else if (categoryProduct === 'accessories') {
    titleSection = 'Accessories';
    descriptionSection = 'Accessories';
  }

  const itemsPerPage = selectedView === 'All' ? sortedProduct.length : +selectedView;
  const totalPages = Math.ceil(sortedProduct.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const viewPage = sortedProduct.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <div className={style.navigation}>
        <img src={homeIcon} alt="home icon" />
        <img src={rightIcon} alt="arrow right icon" />
        <p className={style.navTitle}>{descriptionSection}</p>
      </div>

      <div className={style.pageInfo}>
        <h1 className={style.title}>{titleSection}</h1>
        <p className={style.description}>
          {choseCategory.length} {choseCategory.length === 1 ? 'item' : 'items'}
        </p>
      </div>

      <div className={style.sort}>
        <Dropdown
          options={optionsSort}
          selected={selected}
          onSelect={setSelected}
          title={DropDownTitle.sort}
        />

        <Dropdown
          options={optionViewOnPage}
          selected={selectedView}
          onSelect={setSelectedView}
          title={DropDownTitle.itemOnPage}
        />
      </div>

      <div className={style.container}>
        {viewPage.map(item => (
          <ProductCart product={item} key={item.id} />
        ))}
      </div>

      <div className={style.pagination}>
        {selectedView !== 'All' && (
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        )}
      </div>
    </div>
  );
};
