import React, { useContext } from 'react';
import { RightArrowSVG } from '../../../../../../../../svgs/RightArrowSVG';
import { MainContext } from '../../../../../../../../context/MainContext';
import { SearchContext } from '../../../../../../../../context/SearchContext';
import { DSContext } from '../../../../../../../../context/DSContext';
import styles from '../Arrow.module.scss';
import { useNavigate } from 'react-router-dom';

export interface Props {
  pagesLength: number;
}

export const RightArrow: React.FC<Props> = ({ pagesLength }) => {
  const { pageNumber, PAGE_PARAM, setPageNumber } = useContext(DSContext);
  const { getSearchWith } = useContext(SearchContext);
  const { scrollToTopHandler } = useContext(MainContext);

  const navigate = useNavigate();
  const condition = pageNumber === pagesLength;

  const onClickHandler = () => {
    navigate({ search: getSearchWith({ [PAGE_PARAM]: `${pageNumber + 1}` }) });
    setPageNumber(number => number + 1);
    scrollToTopHandler(0);
  };

  return (
    <button
      className={styles.arrow}
      onClick={onClickHandler}
      disabled={condition}
    >
      <RightArrowSVG />
    </button>
  );
};
