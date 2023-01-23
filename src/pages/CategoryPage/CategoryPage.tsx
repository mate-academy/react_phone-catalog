import classNames from 'classnames';
import React, { useMemo, useState, useEffect } from 'react';
import { Phone } from '../../types/Phone';
import { Item } from '../../components/Item';
import { Path } from '../../components/Path';
import './CategoryPage.scss';

type Props = {
  items: Phone[],
  category: string,
};

enum SortType {
  Newest,
  Low,
  High,
}

const amountOnPageValues = [5, 10, 16, 20, 'all'];

export const CategoryPage: React.FC<Props> = ({ items, category }) => {
  const [amount, setAmount] = useState(0);
  const [amountOnPage, setAmountOnPage] = useState(amountOnPageValues[0]);
  const [pageAmount, setPageAmount] = useState(0);
  const [sortType, setSortType] = useState(SortType.Newest);
  const [currPage, setCurrPage] = useState(1);

  const separatedByCategory = useMemo(() => {
    const newItems = items.filter(item => item.type === category);

    setAmount(newItems.length);

    return newItems;
  }, [items, category]);

  useEffect(() => {
    setAmountOnPage(amountOnPageValues[0]);
    setPageAmount(
      !Number.isNaN(+amountOnPage)
        ? Math.ceil(amount / +amountOnPage)
        : amount,
    );
    setCurrPage(1);
  }, [category]);

  useEffect(() => {
    setPageAmount(
      !Number.isNaN(+amountOnPage)
        ? Math.ceil(amount / +amountOnPage)
        : amount,
    );
  }, []);

  const preparedItems = useMemo(() => {
    separatedByCategory.sort((a, b) => {
      switch (sortType) {
        case SortType.Low:
          return (a.price - ((100 - a.discount) / 100))
            - (b.price - ((100 - b.discount) / 100));
        case SortType.High:
          return (b.price - ((100 - b.discount) / 100))
            - (a.price - ((100 - a.discount) / 100));
        default:
          return a.age - b.age;
      }
    });

    return separatedByCategory;
  }, [sortType, items, category]);

  const clicedItems = () => {
    if (typeof amountOnPage === 'number') {
      return preparedItems.slice(
        (currPage - 1) * amountOnPage,
        currPage * amountOnPage,
      );
    }

    return preparedItems;
  };

  const changeItemAmountHandle = (newAmount: number | string) => {
    setCurrPage(1);
    if (!Number.isNaN(+newAmount)) {
      setAmountOnPage(+newAmount);
      setPageAmount(Math.ceil(amount / +newAmount));
    } else {
      setAmountOnPage(newAmount);
      setPageAmount(1);
    }
  };

  const changeSortTypeHandle = (newSortType: SortType) => {
    setSortType(newSortType);
  };

  const changePagehandle = (action: string | number) => {
    if (typeof action === 'string') {
      switch (action) {
        case 'next':
          setCurrPage(curr => curr + 1);
          break;
        case 'prev':
          if (currPage > 1) {
            setCurrPage(curr => curr - 1);
          }

          break;
        default:
          break;
      }
    } else {
      setCurrPage(action);
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <section className="categoryPage">
      <Path pathElems={[category]} pathBoldElems={[]} />
      <h1 className="categoryPage__title">
        {category[0].toUpperCase() + category.slice(1)}
      </h1>

      <p className="categoryPage__amount">
        {`${amount} models`}
      </p>

      <div className="categoryPage__sort-prop">
        <div className="categoryPage__sortType">
          <p className="categoryPage__sort-text">Sort by</p>
          <select
            className="categoryPage__sortSelect categoryPage__sortType-type"
            name="sortType"
            id="sortType"
            defaultValue={amountOnPage}
            onChange={(event) => changeSortTypeHandle(+event.target.value)}
          >
            <option value={SortType.Newest}>Newest</option>
            <option value={SortType.Low}>Price:Low to High</option>
            <option value={SortType.High}>Price: Hight to Low</option>
          </select>
        </div>

        <div className="categoryPage__sortAmount">
          <p className="categoryPage__sort-text">Items on Page</p>
          <select
            className="categoryPage__sortSelect categoryPage__sortType-amount"
            name="amountOnPage"
            id="AmountOnPage"
            defaultValue={amountOnPage}
            onChange={(event) => {
              changeItemAmountHandle(event.target.value);
            }}
          >
            {amountOnPageValues.map(value => (
              <option
                value={value}
                key={value}
              >
                {value}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="categoryPage__body">
        {clicedItems().map(item => <Item item={item} key={item.id} />)}
      </div>
      {pageAmount > 1 && (
        <div className="categoryPage__selector">
          <button
            type="button"
            aria-label="prev"
            className="categoryPage__button categoryPage__button--reversed"
            onClick={() => changePagehandle('prev')}
          />

          {new Array(pageAmount).fill(0).map((_, index) => (
            <button
              // eslint-disable-next-line react/no-array-index-key
              key={`button_${index}`}
              type="button"
              aria-label="page"
              className={classNames(
                'categoryPage__unit',
                { 'categoryPage__unit--active': currPage === index + 1 },
              )}
              onClick={() => changePagehandle(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            type="button"
            aria-label="next"
            className="categoryPage__button"
            onClick={() => changePagehandle('next')}
          />
        </div>
      )}
    </section>
  );
};
