import { useSaveFilterInParams } from '../../../../utils/saveFilterInParams';
import { Product } from '../../../../types/Product';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useState } from 'react';
import './PagesTop.scss';

type Props = {
  itemsPerPage: number | null;
  renderList: Product[];
  sortSelect: string;
};

export const PagesTop: React.FC<Props> = ({
  renderList,
  itemsPerPage,
  sortSelect,
}) => {
  const [isQuantityOpen, setIsQuantityOpen] = useState<boolean>(false);
  const [isSortOpen, setIsSortOpen] = useState<boolean>(false);
  const doActivQuantitySelect = () => setIsQuantityOpen(prev => !prev);
  const doActivSortSelect = () => setIsSortOpen(prev => !prev);
  const { saveFilterInParams } = useSaveFilterInParams();

  return (
    <section className="PagesTop">
      <nav>
        <ul className="PagesTop__breadcrumb">
          <li>
            <Link className="PagesTop__breadcrumb-icon" to="/">
              <img src="/icons/icon-house.svg" alt="Icon House" />
            </Link>
          </li>

          <Link to="/phones" className="PagesTop__breadcrumb-path">
            Phones
          </Link>
        </ul>
      </nav>

      <h1 className="PagesTop__h1">Mobile phones</h1>

      <p className="PagesTop__p">{renderList?.length} models</p>

      <div className="PagesTop__selects">
        <div className="PagesTop__selects-sort">
          <p className="PagesTop__selects-sort-p">Sort by</p>

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
                      saveFilterInParams('filter01', item);
                    }}
                  >
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="PagesTop__selects-quantity ">
          <p className="PagesTop__selects-quantity-p">Items on page</p>

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
                      saveFilterInParams('filter02', y);
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
