import styles from './SortProduct.module.scss';
import classNames from 'classnames';
import { Select } from '../../types/Select';
import React, { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/getSearchWith';
import { SortBy } from '../../types/SortBy';

interface Props {}

export const SortProduct: React.FC<Props> = ({}) => {
  const [isSortByOpen, setIsSortByOpen] = useState(false);
  const [isSortItemsOpen, setIsSortItemsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const sortedBy =
    (searchParams.get('sortBy') || SortBy.newest)[0].toUpperCase() +
    (searchParams.get('sortBy') || SortBy.newest).slice(1);
  let itemsPerPage = searchParams.get('perPage') || '4';

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
    }

    return () =>
      document.removeEventListener('touchstart', handleBtnBlurMobile);
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

  const changeSortByTitle: MouseEventHandler<HTMLUListElement> = e => {
    const target = e.target as HTMLElement;

    if (target.textContent) {
      setSearchWith({ sortBy: target.textContent.toLowerCase() });

      setIsSortByOpen(false);
    }
  };

  const changeItemsPerPageTitle: MouseEventHandler<HTMLUListElement> = e => {
    const target = e.target as HTMLElement;

    if (target.textContent) {
      setSearchWith({ perPage: target.textContent.toLowerCase() });
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
        <div
          className={classNames(
            styles.selectContainer,
            styles.selectContainer1,
          )}
        >
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
          </button>
        </div>
        <ul
          className={classNames(styles.selectMenuContainer, {
            [styles.selectMenuContainerIsActive]: isSortByOpen,
          })}
          onClick={changeSortByTitle}
          tabIndex={-1}
        >
          <li className={styles.selectMenuItem}>Newest</li>
          <li className={styles.selectMenuItem}>Oldest</li>
          <li className={styles.selectMenuItem}>Expensive</li>
          <li className={styles.selectMenuItem}>Cheapest</li>
        </ul>
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
          </button>
        </div>
        <ul
          className={classNames(styles.selectMenuContainer, {
            [styles.selectMenuContainerIsActive]: isSortItemsOpen,
          })}
          onClick={changeItemsPerPageTitle}
          tabIndex={-1}
        >
          <li className={styles.selectMenuItem}>4</li>
          <li className={styles.selectMenuItem}>8</li>
          <li className={styles.selectMenuItem}>16</li>
          <li className={styles.selectMenuItem}>All</li>
        </ul>
      </div>
    </div>
  );
};
