import { NavLink, useSearchParams } from 'react-router-dom';
import { Pagination } from '../../components/Pagination/Pagination';
import { SortByItem } from '../../helpers/sortBy';
import './ProductList.scss';
import React, { useEffect } from 'react';
import { TabAccessPhone } from '../../types/tabAccessPhones';
import { PhoneTablAccessCard } from '../../components/PhoneTablAccessCard/PhoneTablAccessCard';
import { useAppSelector } from '../../app/hooks';
import { Loader } from '../../components/Loader';
import { useLocalStorage } from '../../LocaleStorage/LocaleStorage';

interface Props {
  products: TabAccessPhone[];
  sorted?: SortByItem | undefined;
}

export const ProductList: React.FC<Props> = ({ products }) => {
  const { loading } = useAppSelector(state => state.products);

  const [searchParams] = useSearchParams();
  const [choosenItems, setChoosenItems] = useLocalStorage<
    TabAccessPhone[] | []
  >('products', []);

  const sortBy = searchParams.get('sortBy');
  const perPage = searchParams.get('perPage') || 'all';
  const currentPage = searchParams.get('page') || '1';
  const itemsPerPage = perPage === 'all' ? choosenItems.length : perPage;
  const firstItemIndex = (+currentPage - 1) * +itemsPerPage;
  const lastItemIndex = Math.min(
    +currentPage * +itemsPerPage,
    choosenItems.length,
  );

  useEffect(() => {
    if (products.length) {
      setChoosenItems(products);
    }
  }, [products, setChoosenItems]);

  function filteredProducts(items: TabAccessPhone[]) {
    const tempItems = [...items];

    switch (sortBy) {
      // case SortByItem.Age:
      //   return items?.sort((a, b) => (a.year - b.year ? 1 : -1));
      case SortByItem.Name:
        return tempItems.sort((a, b) => a.name.localeCompare(b.name));
      case SortByItem.Price:
        return tempItems.sort((a, b) => a.priceDiscount - b.priceDiscount);
      default:
        return tempItems;
    }
  }

  const toBeFiltered = filteredProducts(choosenItems);

  const filtered = toBeFiltered.slice(firstItemIndex, lastItemIndex);

  const showPagination = filtered.length < choosenItems.length;

  return (
    <>
      <ul className="productsPage__list">
        {loading ? (
          <Loader />
        ) : (
          filtered?.map((product: TabAccessPhone) => {
            return (
              <NavLink
                key={product.id}
                to={`/${product.category}/${product.id}`}
                className="productsPage__link"
              >
                <PhoneTablAccessCard product={product} key={product.id} />
              </NavLink>
            );
          })
        )}
      </ul>
      {showPagination ? <Pagination products={choosenItems} /> : null}
    </>
  );
};
