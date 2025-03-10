import React from 'react';
import { Gadget } from '../shared/types/Gadget';
import style from './GadgetsCollection.module.scss';
import { ProductsList } from '../shared/ProductsList';
import { SortSelect } from './SortSelect';
import { ItemsPerPageSelect } from './ItemsPerPageSelect';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  gadgets: Gadget[];
  title: string;
  category: string;
};

export const GadgetsCollection: React.FC<Props> = ({
  gadgets,
  category,
  title,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const perPage = searchParams.get('perPage') || 'all';
  const page = Number(searchParams.get('page')) || 1;
  const itemsPerPage = perPage === 'all' ? gadgets.length : Number(perPage);
  const totalPages = Math.ceil(gadgets.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleGadgets = gadgets.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    if (newPage === 1) {
      searchParams.delete('page');
    } else {
      searchParams.set('page', String(newPage));
    }

    setSearchParams(searchParams);
  };

  return (
    <div className={style.collection}>
      <div className={style.collection__header}>
        <Link to="/">
          <img src="./icons/home.png" alt="Back home" />
        </Link>
        <img src="./icons/arrow-right.png" alt="Gadgets" />
        <span className={style.collection__name}>{category}</span>
      </div>
      <h1 className={style.title}>{title}</h1>
      <p className={style.collection__quantity}>{gadgets.length} items</p>
      <div className={style.collection__selects}>
        <SortSelect />
        <ItemsPerPageSelect />
      </div>
      <ProductsList products={visibleGadgets} discount={true} />
      {totalPages > 1 && (
        <div className={style.pagination}>
          <button
            className={style.pagination__prev}
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            <img
              className={style.pagination__arrow}
              src="./icons/arrow-left-dark.png"
              alt="Back"
            />
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={classNames(style.pagination__button, {
                [style['pagination__button--active']]: page === i + 1,
              })}
            >
              {i + 1}
            </button>
          ))}
          <button
            className={style.pagination__next}
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
          >
            <img
              className={style.pagination__arrow}
              src="./icons/arrow-right-dark.png"
              alt="Next"
            />
          </button>
        </div>
      )}
    </div>
  );
};
