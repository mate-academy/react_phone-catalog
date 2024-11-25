import classNames from 'classnames';
import styles from './Pagination.module.scss';
import { IconButton } from '../IconButton';
import { IconButtonSVGOption } from '../../types/enums';
import { useEffect, useRef, useState } from 'react';
import { PaginationButton } from '../PaginationButton';
import { getAmountOfPages } from '../../functions/functions';
import { useListControls } from '../../hooks/useListControls';
import { useLanguage } from '../Contexts/LanguageContext';

type Props = {
  amountOfItems: number;
  className?: string;
};

export const Pagination: React.FC<Props> = ({ amountOfItems, className }) => {
  const minAmountOfButtons = 7;
  const { accessPrevious, accessNext } = useLanguage().localeTexts;
  const {
    pagination: perPage,
    page: chosenPage,
    setListControls,
  } = useListControls(amountOfItems);
  const [amountOfButtons, setAmountOfButtons] = useState(minAmountOfButtons);
  const [scrollToBottom, setScrollToBottom] = useState(false);
  const paginationRef = useRef<HTMLMenuElement>(null);
  const itemRef = useRef<HTMLLIElement>(null);
  const amountOfPages = getAmountOfPages(perPage, amountOfItems);

  const updateAmountOfButtons = () => {
    const pagination = paginationRef.current;
    const button = itemRef.current;
    let newAmountOfButtons = minAmountOfButtons;

    if (pagination && button) {
      const paginationStyles = getComputedStyle(pagination);
      const paginationWidth = parseFloat(paginationStyles.width);
      const gap = parseFloat(paginationStyles.gap);
      const buttonWidth = button.offsetWidth;

      const calculatedAmountOfButtons = Math.floor(
        (paginationWidth - gap) / (buttonWidth + gap),
      );

      if (calculatedAmountOfButtons >= minAmountOfButtons) {
        newAmountOfButtons = calculatedAmountOfButtons;
      }
    }

    setAmountOfButtons(newAmountOfButtons);
  };

  const setPage = (newPage: number) => {
    setListControls({ page: newPage });
    setScrollToBottom(true);
  };

  const handlePageChange = (newPage: number) => setPage(newPage);

  const handlePageChangeToNext = () => setPage(chosenPage + 1);

  const handlePageChangeToPrev = () => setPage(chosenPage - 1);

  const isFirstPageOpened = (): boolean => {
    return chosenPage <= 1;
  };

  const isLastPageOpened = (): boolean => {
    return chosenPage >= amountOfPages;
  };

  useEffect(() => {
    if (scrollToBottom) {
      window.scrollTo({ top: document.documentElement.scrollHeight });
      setScrollToBottom(false);
    }
  }, [scrollToBottom]);

  useEffect(updateAmountOfButtons, [amountOfPages]);

  useEffect(() => {
    window.addEventListener('resize', updateAmountOfButtons);

    return () => {
      window.removeEventListener('resize', updateAmountOfButtons);
    };
  }, []);

  let firstButtonPage = 1;
  let amountOfMidShownPages = amountOfPages;
  let jumpToFirstPage = false;
  let jumpToLastPage = false;

  if (amountOfPages > amountOfButtons - 2) {
    amountOfMidShownPages = amountOfButtons - 3;
    const amountOfMidHiddenPages = amountOfPages - amountOfMidShownPages;

    if (chosenPage < amountOfMidShownPages && chosenPage <= amountOfPages / 2) {
      jumpToLastPage = true;
    } else if (chosenPage > amountOfMidHiddenPages + 1) {
      firstButtonPage = amountOfMidHiddenPages + 1;
      jumpToFirstPage = true;
    } else {
      amountOfMidShownPages--;
      firstButtonPage =
        chosenPage - Math.floor((amountOfMidShownPages - 1) / 2);
      jumpToFirstPage = true;
      jumpToLastPage = true;
    }
  }

  return (
    <menu
      ref={paginationRef}
      className={classNames(styles.Pagination, className)}
    >
      <li ref={itemRef}>
        <IconButton
          svgOption={IconButtonSVGOption.LeftArrow}
          disabled={isFirstPageOpened()}
          label={accessPrevious}
          onClick={handlePageChangeToPrev}
        />
      </li>

      {jumpToFirstPage && (
        <li>
          <PaginationButton
            page={1}
            chosenPage={chosenPage}
            onPageChange={handlePageChange}
          />
        </li>
      )}

      <li className={styles.Gap}>
        {jumpToFirstPage && <p className={styles.Dots}>...</p>}
      </li>

      {Array.from({ length: amountOfMidShownPages }, (_, index) => {
        const page = index + firstButtonPage;

        return (
          <li key={page}>
            <PaginationButton
              page={page}
              chosenPage={chosenPage}
              onPageChange={handlePageChange}
            />
          </li>
        );
      })}

      <li className={styles.Gap}>
        {jumpToLastPage && <p className={styles.Dots}>...</p>}
      </li>

      {jumpToLastPage && (
        <li>
          <PaginationButton
            page={amountOfPages}
            chosenPage={chosenPage}
            onPageChange={handlePageChange}
          />
        </li>
      )}

      <li>
        <IconButton
          svgOption={IconButtonSVGOption.RightArrow}
          disabled={isLastPageOpened()}
          label={accessNext}
          onClick={handlePageChangeToNext}
        />
      </li>
    </menu>
  );
};
