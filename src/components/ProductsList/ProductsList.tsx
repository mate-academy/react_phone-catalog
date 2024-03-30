/* eslint-disable consistent-return */
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
    currentPage,
  } = useContext(MainContext);

  const [currentPageNum, setCurrentPageNum] = useState(1);

  const pageChange = (page: number) => {
    setCurrentPageNum(page);
  };

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

    const startItem = currentPageNum * +itemsOnPage - +itemsOnPage;
    const endItem = currentPageNum * +itemsOnPage;

    if (startItem > visibleList.length
        || endItem > (visibleList.length + +itemsOnPage)) {
      setCurrentPageNum(1);
    }

    return visibleList.slice(startItem, endItem);
  }, [sortType, itemsOnPage, products, currentPageNum]);

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
      {(itemsOnPage !== 'All' && currentPage !== 'Favourites') && (
        <Pagination
          itemsOnPage={itemsOnPage}
          productsListLenth={products.length}
          currentPage={currentPageNum}
          onPageChange={pageChange}
        />
      )}
    </div>
  );
};
