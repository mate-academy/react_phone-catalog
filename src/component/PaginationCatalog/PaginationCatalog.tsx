import './PaginationCatalog.scss';
import { ProductItem } from '../types/Phone';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

interface Props {
  products: ProductItem[];
}

export const PaginationCatalog: React.FC<Props> = ({ products }) => {
  const [searchParams, setSearchParams] = useSearchParams('');
  const openPage = parseInt(searchParams.get('page') || '1');
  const clickOnOtherPage = (value: number) => {
    const stringValue = value.toString();

    searchParams.set('page', stringValue);
    setSearchParams(searchParams);
  };

  const movePage = (direction: string) => {
    if (direction === 'right') {
      searchParams.set('page', (openPage + 1).toString());
      setSearchParams(searchParams);
    }

    if (direction === 'left') {
      searchParams.set('page', (openPage - 1).toString());
      setSearchParams(searchParams);
    }
  };

  const itemsInPageParam = parseInt(searchParams.get('items') || '16');
  const buttonsInPage = Math.ceil(products.length / itemsInPageParam);

  return (
    <div className="page-navigation__item">
      <button
        onClick={() => {
          movePage('left');
        }}
        className={classNames('button__move-catalog', {
          'is-disabled': openPage === 1,
        })}
        disabled={openPage === 1}
      >
        <img
          className="button__left"
          src="../../../public/imgForProject/icon/Catalog_Right-button.png"
          alt="left"
        />
      </button>
      <ul className="list-of-buttons__item">
        <ul className="list-of-buttons__item">
          {Array.from({ length: buttonsInPage }, (_, index) => (
            <li key={index} className="list-item">
              <button
                className={classNames('page-button', {
                  active: openPage === index + 1,
                })}
                onClick={() => {
                  clickOnOtherPage(index + 1);
                }}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </ul>
      <button
        className={classNames('button__move-catalog', {
          'is-disabled': buttonsInPage === openPage,
        })}
        onClick={() => {
          movePage('right');
        }}
        disabled={buttonsInPage === openPage}
      >
        <img
          src="../../../public/imgForProject/icon/Catalog_Right-button.png"
          alt="right"
        />
      </button>
    </div>
  );
};
