import { NavLink } from 'react-router-dom';
import { Pagination } from '../../components/Pagination/Pagination';
import { SortByItem } from '../../helpers/sortBy';
import './ProductList.scss';
import React, { useEffect } from 'react';
import { PhoneTablAccessCard } from '../../components/PhoneTablAccessCard/PhoneTablAccessCard';
import { useAppSelector } from '../../app/hooks';
import { Loader } from '../../components/Loader';
import { useLocalStorage } from '../../LocaleStorage/LocaleStorage';
import { Category } from '../../types/category';
import { Product } from '../../types/product';

type Props = {
  products: Product[];
  category?: Category;
  sorted?: SortByItem | undefined;
  sortBy?: string;
  perPage?: string;
  currentPage?: string;
}

export const ProductList: React.FC<Props> = ({
  products,
  category,
  sortBy,
  perPage,
  currentPage,
}) => {
  const { loading } = useAppSelector(state => state.allProducts);

  const [choosenItems, setChoosenItems] = useLocalStorage<
    Product[] | []
  >('products', []);

  currentPage ??= '1';
  perPage ??= choosenItems.length.toString();

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

  function sortProducts(items: Product[]) {
    const tempItems = [...items];

    switch (sortBy) {
      case SortByItem.Age:
        return items?.sort((a, b) => (a.year - b.year ? 1 : -1));
      case SortByItem.Name:
        return tempItems.sort((a, b) => a.name.localeCompare(b.name));
      case SortByItem.Price:
        return tempItems.sort((a, b) => a.fullPrice - b.price);
      default:
        return tempItems;
    }
  }

  const sortedProducts = sortProducts(choosenItems);

  const filtered = sortedProducts.slice(firstItemIndex, lastItemIndex);

  const showPagination = filtered.length < choosenItems.length;

  return (
    <>
      <ul className="productsPage__list">
        {loading ? (
          <Loader />
        ) : (
          (filtered
            ? filtered?.map((product: Product) => {

              console.log(product)
              return (
                <NavLink
                  key={product.id}
                  to={`/${product.category}/${product.itemId}`}
                  className="productsPage__link"
                >
                  <PhoneTablAccessCard product={product} key={product.id} />
                </NavLink>
              );
            })
            : <div>There are no {category} yet</div>
          )
        )}
      </ul>
      {showPagination ? <Pagination products={choosenItems} /> : null}
    </>
  );
};
