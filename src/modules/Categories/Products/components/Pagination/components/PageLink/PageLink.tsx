import React, { useContext } from 'react';
import styles from './PageLink.module.scss';
import { Link } from 'react-router-dom';
import { SearchContext } from '../../../../../../../context/SearchContext';
import { DSContext } from '../../../../../../../context/DSContext';
import classNames from 'classnames';
import { MainContext } from '../../../../../../../context/MainContext';

interface Props {
  value: number;
}

export const PageLink = React.memo(({ value }: Props) => {
  const { pageNumber, PAGE_PARAM, setPageNumber } = useContext(DSContext);
  const { getSearchWith } = useContext(SearchContext);
  const { scrollToTopHandler } = useContext(MainContext);

  const onClickHandler = (number: number) => {
    scrollToTopHandler(0);
    setPageNumber(number);
  };

  return (
    <Link
      to={{ search: getSearchWith({ [PAGE_PARAM]: String(value) }) }}
      className={classNames(styles.number, {
        [styles['is-active']]: pageNumber === value,
      })}
      onClick={() => onClickHandler(value)}
    >
      {value}
    </Link>
  );
});

PageLink.displayName = 'PageLink';
