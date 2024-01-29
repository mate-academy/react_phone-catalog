/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useContext, useMemo, useState } from 'react';
import { Product } from '../../types/Product';
import { Pagination } from '../Pagination';
import { ProductCard } from '../ProductCard';
import './products-list.scss';
import { MainContext } from '../../context';

type Props = {
  products: Product[],
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  const {
    sortType,
    itemsOnPage,
  } = useContext(MainContext);

  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = useMemo(() => {
    let visibleList = [...products];

    if (sortType !== 'No sorting') {
      switch (sortType) {
        case 'Newest':
          visibleList = visibleList.sort((a, b) => b.year - a.year);
          break;
        case 'Alphabetically':
          visibleList = visibleList.sort((
            a, b,
          ) => a.name.localeCompare(b.name));
          break;
        case 'Cheapest':
          visibleList = visibleList.sort((a, b) => a.price - b.price);
          break;
        default:
          break;
      }
    }

    if (itemsOnPage === 'All') {
      return visibleList;
    }

    const startItem = currentPage * +itemsOnPage - +itemsOnPage;
    const endItem = currentPage * +itemsOnPage;

    return visibleList.slice(startItem, endItem);
  }, [sortType, itemsOnPage, products, currentPage]);

  const pageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="product-list__wrapper">
      <ul className="product-list" data-cy="cardsContainer">
        {filteredProducts.map(product => (
          <li className="product-list__item" key={product.id}>
            <ProductCard
              product={product}
            />
          </li>
        ))}
      </ul>
      {itemsOnPage !== 'All' && (
        <Pagination
          itemsOnPage={itemsOnPage}
          productsListLenth={products.length}
          currentPage={currentPage}
          onPageChange={pageChange}
        />
      )}
    </div>
  );
};
