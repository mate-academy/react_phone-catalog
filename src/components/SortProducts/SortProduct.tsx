/* eslint-disable max-len */
import styles from './SortProduct.module.scss';
import classNames from 'classnames';
import { Select } from '../../types/Select';
import React, { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/getSearchWith';
import { SortBy } from '../../types/SortBy';
import { ItemsPerPage } from '../../types/ItemsPerPage';

interface Props {}

export const SortProduct: React.FC<Props> = ({}) => {
  const [isSortByOpen, setIsSortByOpen] = useState(false);
  const [isSortItemsOpen, setIsSortItemsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const sort =
    (Object.keys(SortBy).includes(String(searchParams.get('sortBy'))) &&
      searchParams.get('sortBy')) ||
    SortBy.newest;

  const sortedBy = sort[0].toUpperCase() + sort.slice(1);
  const items = Object.values(ItemsPerPage).includes(
    searchParams.get('perPage') as ItemsPerPage,
  )
    ? (searchParams.get('perPage') as ItemsPerPage)
    : ItemsPerPage.four;

  let itemsPerPage = items.toString();

  if (!+itemsPerPage) {
    itemsPerPage = itemsPerPage[0].toUpperCase() + itemsPerPage.slice(1);
  }

  const sortBy = useRef<HTMLButtonElement | null>(null);
  const sortTitleRef = useRef<HTMLSpanElement | null>(null);
  const itemsOnPage = useRef<HTMLButtonElement | null>(null);
  const itemsTitleRef = useRef<HTMLSpanElement | null>(null);

  const setSearchWith = (obj: object) => {
    const search = getSearchWith(obj, searchParams);

    setSearchParams(search);
  };

  const handleFocus: MouseEventHandler<HTMLDivElement> = e => {
    const target = e.target as HTMLElement;

    if (sortBy.current && target.textContent === Select.sortBy) {
      if (isSortByOpen) {
        setIsSortByOpen(false);

        return;
      }

      sortBy.current.focus();
      setIsSortByOpen(true);
    }

    if (itemsOnPage.current && target.textContent === Select.itemsOnPage) {
      if (isSortItemsOpen) {
        setIsSortItemsOpen(false);

        return;
      }

      itemsOnPage.current.focus();
      setIsSortItemsOpen(true);
    }
  };

  const handleClick = (select: Select) => {
    if (sortBy.current && select === Select.sortBy) {
      setIsSortByOpen(!isSortByOpen);
    }

    if (itemsOnPage.current && select === Select.itemsOnPage) {
      setIsSortItemsOpen(!isSortItemsOpen);
    }
  };

  const handleBtnBlurMobile: EventListener = e => {
    const target = e.target as HTMLElement;

    if (target.textContent === Select.sortBy) {
      if (isSortItemsOpen) {
        setIsSortItemsOpen(false);

        return;
      }
    }

    if (target.textContent === Select.itemsOnPage) {
      if (isSortByOpen) {
        setIsSortByOpen(false);

        return;
      }
    }

    if (
      !target?.hasAttribute('tabIndex') &&
      target !== sortTitleRef.current &&
      target !== sortBy.current
    ) {
      setTimeout(() => setIsSortByOpen(false), 150);
    }

    if (
      !target?.hasAttribute('tabIndex') &&
      target !== itemsTitleRef.current &&
      target !== itemsOnPage.current
    ) {
      setTimeout(() => setIsSortItemsOpen(false), 150);
    }
  };

  useEffect(() => {
    if (isSortByOpen || isSortItemsOpen) {
      document.addEventListener('touchstart', handleBtnBlurMobile);
      document.addEventListener('mousedown', handleBtnBlurMobile);
    }

    return () => {
      document.removeEventListener('touchstart', handleBtnBlurMobile);
      document.removeEventListener('mousedown', handleBtnBlurMobile);
    };
  }, [isSortByOpen, isSortItemsOpen]);

  const handleBtnBlur: React.FocusEventHandler<HTMLButtonElement> = e => {
    const select = e.currentTarget.getAttribute('data-select');

    if (
      sortBy.current?.classList.contains(styles.selectBtnIsActive) &&
      select === Select.sortBy
    ) {
      if (
        e.relatedTarget?.hasAttribute('tabIndex') &&
        e.relatedTarget !== itemsTitleRef.current
      ) {
        return;
      }

      setIsSortByOpen(false);
    }

    if (
      itemsOnPage.current?.classList.contains(styles.selectBtnIsActive) &&
      select === Select.itemsOnPage
    ) {
      if (
        e.relatedTarget?.hasAttribute('tabIndex') &&
        e.relatedTarget !== sortTitleRef.current
      ) {
        return;
      }

      setIsSortItemsOpen(false);
    }
  };

  const changeSortByTitle: MouseEventHandler<HTMLDivElement> = e => {
    const target = e.target as HTMLElement;

    if (target.textContent) {
      if (target.textContent !== sortedBy) {
        setSearchWith({ sortBy: target.textContent.toLowerCase(), page: 1 });
      }

      setIsSortByOpen(false);
    }
  };

  const changeItemsPerPageTitle: MouseEventHandler<HTMLDivElement> = e => {
    const target = e.target as HTMLElement;

    if (target.textContent) {
      if (target.textContent !== itemsPerPage) {
        setSearchWith({ perPage: target.textContent.toLowerCase(), page: 1 });
      }

      setIsSortItemsOpen(false);
    }
  };

  return (
    <div className={styles.sortContainer} onClick={handleFocus}>
      <div
        className={classNames(
          styles.sortItemContainer,
          styles.sortItemContainer1,
        )}
      >
        <span ref={sortTitleRef} className={styles.selectTitle} tabIndex={-1}>
          Sort by
        </span>
        <div className={styles.selectContainer}>
          <button
            ref={sortBy}
            className={classNames(styles.selectBtn, {
              [styles.selectBtnIsActive]: isSortByOpen,
            })}
            data-select={Select.sortBy}
            onClick={() => handleClick(Select.sortBy)}
            onBlur={handleBtnBlur}
          >
            {sortedBy}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.4715 5.52864C12.7318 5.78899 12.7318 6.2111 12.4715 6.47145L8.47149 10.4714C8.21114 10.7318 7.78903 10.7318 7.52868 10.4714L3.52868 6.47144C3.26833 6.2111 3.26833 5.78899 3.52868 5.52864C3.78903 5.26829 4.21114 5.26829 4.47149 5.52864L8.00008 9.05723L11.5287 5.52864C11.789 5.26829 12.2111 5.26829 12.4715 5.52864Z" />
            </svg>
          </button>
        </div>
        <div
          className={classNames(styles.selectMenuContainer, {
            [styles.selectMenuContainerIsActive]: isSortByOpen,
          })}
          onClick={changeSortByTitle}
          tabIndex={-1}
        >
          <ul
            className={classNames(styles.selectMenuList, {
              [styles.selectMenuListIsNotActive]: !isSortByOpen,
            })}
          >
            <li className={styles.selectMenuItem}>Newest</li>
            <li className={styles.selectMenuItem}>Oldest</li>
            <li className={styles.selectMenuItem}>Expensive</li>
            <li className={styles.selectMenuItem}>Cheapest</li>
          </ul>
        </div>
      </div>
      <div className={styles.sortItemContainer}>
        <span ref={itemsTitleRef} className={styles.selectTitle} tabIndex={-1}>
          Items on page
        </span>
        <div
          className={classNames(
            styles.selectContainer,
            styles.selectContainer1,
          )}
        >
          <button
            ref={itemsOnPage}
            className={classNames(styles.selectBtn, {
              [styles.selectBtnIsActive]: isSortItemsOpen,
            })}
            data-select={Select.itemsOnPage}
            onClick={() => handleClick(Select.itemsOnPage)}
            onBlur={handleBtnBlur}
          >
            {itemsPerPage}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.4715 5.52864C12.7318 5.78899 12.7318 6.2111 12.4715 6.47145L8.47149 10.4714C8.21114 10.7318 7.78903 10.7318 7.52868 10.4714L3.52868 6.47144C3.26833 6.2111 3.26833 5.78899 3.52868 5.52864C3.78903 5.26829 4.21114 5.26829 4.47149 5.52864L8.00008 9.05723L11.5287 5.52864C11.789 5.26829 12.2111 5.26829 12.4715 5.52864Z" />
            </svg>
          </button>
        </div>
        <div
          className={classNames(styles.selectMenuContainer, {
            [styles.selectMenuContainerIsActive]: isSortItemsOpen,
          })}
          onClick={changeItemsPerPageTitle}
          tabIndex={-1}
        >
          <ul
            className={classNames(styles.selectMenuList, {
              [styles.selectMenuListIsNotActive]: !isSortItemsOpen,
            })}
          >
            <li className={styles.selectMenuItem}>4</li>
            <li className={styles.selectMenuItem}>8</li>
            <li className={styles.selectMenuItem}>16</li>
            <li className={styles.selectMenuItem}>All</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
