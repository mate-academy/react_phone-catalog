import './ProductsList.scss';
import { useEffect, useState } from 'react';
import { Product } from '../../../react-app-env';
import { Card } from '../Card/Card';
import { Pagination } from '../Pagination/Pagination';
import { Loader } from '../../Loader/Loader';

type Props = {
  currentListForRender: Product[];
  itemsPerPage: string;
};

export const ProductsList: React.FC<Props> = ({
  currentListForRender,
  itemsPerPage,
}) => {
  const total = currentListForRender.length;
  const [
    currentListPerPage,
    setCurrentListPerPage,
  ] = useState(currentListForRender);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    switch (itemsPerPage) {
      case '4':
        setCurrentListPerPage(currentListForRender
          .slice(0 + (currentPage - 1) * 4, 4 * currentPage));
        break;

      case '8':
        setCurrentListPerPage(currentListForRender
          .slice(0 + (currentPage - 1) * 8, 8 * currentPage));
        break;

      case '16':
        setCurrentListPerPage(currentListForRender
          .slice(0 + (currentPage - 1) * 16, 16 * currentPage));
        break;

      default:
        setCurrentListPerPage(currentListForRender);
        break;
    }
  }, [itemsPerPage, currentPage, currentListForRender]);

  return (
    <>
      <div data-cy="productList" className="productslist">
        {!currentListPerPage && <Loader />}
        <ul
          className="productslist__list"
        >
          {currentListPerPage.map(item => (
            <li
              key={item.id}
              className="productslist__listitem"
            >
              <Card
                age={item.age}
                id={item.id}
                type={item.type}
                imageUrl={item.imageUrl}
                name={item.name}
                snippet={item.snippet}
                price={item.price}
                discount={item.discount}
                screen={item.screen}
                capacity={item.capacity}
                ram={item.ram}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className={total <= +itemsPerPage
        ? 'paginations'
        : ''}
      >
        <Pagination
          total={total}
          itemsPerPage={+itemsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </>
  );
};
