import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { useState } from 'react';
import './PhonesTop.scss';
import { Product } from '../../../../types/Product';

type Props = {
  itemsPerPage: number | null;
  phonesList: Product[];
  sortSelect: string;
};

export const PhonesTop: React.FC<Props> = ({
  phonesList,
  itemsPerPage,
  sortSelect,
}) => {
  const [isQuantityOpen, setIsQuantityOpen] = useState<boolean>(false);
  const [isSortOpen, setIsSortOpen] = useState<boolean>(false);
  const doActivQuantitySelect = () => setIsQuantityOpen(prev => !prev);
  const doActivSortSelect = () => setIsSortOpen(prev => !prev);

  const [searchParams, setSearchParams] = useSearchParams();

  const saveFilterParams = (key: string, value: string | number) => {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set(key, String(value));

    setSearchParams(newSearchParams);
  };

  return (
    <section className="phones-top">
      <nav>
        <ul className="phones-top__breadcrumb">
          <li>
            <Link className="phones-top__breadcrumb-icon" to="/">
              <img
                src="../../../../public/icons/icon-house.svg"
                alt="Icon House"
              />
            </Link>
          </li>

          <Link to="/phones" className="phones-top__breadcrumb-path">
            Phones
          </Link>
        </ul>
      </nav>

      <h1 className="phones-top__h1">Mobile phones</h1>

      <p className="phones-top__p">{phonesList?.length} models</p>

      <div className="phones-top__selects">
        <div className="phones-top__selects-sort">
          <p className="phones-top__selects-sort-p">Sort by</p>

          <div
            className={classNames('sort-dropdown', {
              'dropdown--activ': isSortOpen === true,
            })}
          >
            <button
              className="sort-dropdown__button"
              onClick={() => {
                doActivSortSelect();
              }}
            >
              {sortSelect}
            </button>

            <ul className="sort-dropdown__content">
              {['Newest', 'Alphabetically', 'Cheapest'].map(item => {
                return (
                  <li
                    key={item}
                    className={classNames('sort-dropdown__content-item', {
                      'dropdown-activ-item': sortSelect === item,
                    })}
                    onClick={() => {
                      saveFilterParams('filter01', item);
                    }}
                  >
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="phones-top__selects-quantity ">
          <p className="phones-top__selects-quantity-p">Items on page</p>

          <div
            className={classNames('quantity-dropdown', {
              'dropdown--activ': isQuantityOpen === true,
            })}
          >
            <button
              onClick={() => {
                doActivQuantitySelect();
              }}
              className="quantity-dropdown__button"
            >
              {itemsPerPage}
            </button>

            <ul
              className="quantity-dropdown__content"
              tabIndex={0} // щоб елемент мав фокус
              onBlur={() => setIsQuantityOpen(false)}
            >
              {[16, 8, 4].map(y => {
                return (
                  <li
                    key={y}
                    className={classNames('sort-dropdown__content-item', {
                      'dropdown-activ-item': itemsPerPage === y,
                    })}
                    onClick={() => {
                      saveFilterParams('filter02', y);
                    }}
                  >
                    {y}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

// tabIndex={0} — це атрибут, який дозволяє елементу бути фокусованим
//  і доступним для навігації клавішею Tab у природному порядку документа.
