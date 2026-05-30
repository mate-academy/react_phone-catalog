/* eslint-disable @typescript-eslint/indent */
import classNames from 'classnames';
import React, { useContext } from 'react';
import { SearchLink } from '../SearchLink/SearchLink';
import { scrollToTop } from '../../../../utils/scrollToTop';
// eslint-disable-next-line max-len
import { SecondaryButton } from '../ActionButtons/SecondaryButton/SecondaryButton';
import { DarkModeContext } from '../../../../Store/StoreThemeMode';

interface Props {
  activePage: number;
  numberOfPages: number[];
}

export const ProductPageButtons: React.FC<Props> = ({
  activePage,
  numberOfPages,
}) => {
  const { isDark } = useContext(DarkModeContext);

  const copyList = [...numberOfPages];

  copyList.shift();
  copyList.pop();

  const startingItem = activePage === 1 ? +activePage - 1 : +activePage - 2;
  const indexToCompare = numberOfPages[numberOfPages.length - 3];
  const listStart = copyList.slice(
    activePage > 2 ? startingItem - 1 : startingItem,
    activePage === 1 ? activePage + 1 : activePage,
  );
  const listEnd = copyList.slice(
    activePage <= numberOfPages[numberOfPages.length - 3]
      ? indexToCompare - 3
      : indexToCompare - 2,
    numberOfPages[numberOfPages.length - 2],
  );
  const listToCompare = numberOfPages.length > 5 ? listStart : copyList;
  const listToRender = +activePage >= indexToCompare ? listEnd : listToCompare;

  return (
    <div className="product-page__buttons">
      <SearchLink
        className={classNames({
          'product-page__button--disabled': activePage === 1,
        })}
        params={{ page: activePage === 2 ? null : activePage - 1 }}
      >
        <SecondaryButton
          isDisabled={activePage === 1}
          isDark={isDark}
          onClickHandler={scrollToTop}
        />
      </SearchLink>

      <div className="product-page__page-buttons">
        <SearchLink
          params={{ page: null }}
          className={classNames('product-page__button', {
            'product-page__button--is-Dark': isDark,
            'product-page__button--is-Dark-Active': isDark && activePage === 1,
            'product-page__button--active': activePage === 1,
          })}
          onClick={scrollToTop}
        >
          1
        </SearchLink>

        {numberOfPages.length > 5 && activePage >= 4 && (
          <p style={{ color: isDark ? 'white' : 'black' }}>...</p>
        )}

        {listToRender.map(item => (
          <SearchLink
            key={item}
            params={{ page: item === 1 ? null : item }}
            className={classNames('product-page__button', {
              'product-page__button--is-Dark': isDark,
              'product-page__button--is-Dark-Active':
                isDark && activePage === item,
              'product-page__button--active': activePage === item,
            })}
            onClick={scrollToTop}
          >
            {item}
          </SearchLink>
        ))}

        {numberOfPages.length > 5 &&
          activePage <= numberOfPages[numberOfPages.length - 4] && (
            <p style={{ color: isDark ? 'white' : 'black' }}>...</p>
          )}

        <SearchLink
          params={{ page: `${numberOfPages[numberOfPages.length - 1]}` }}
          className={classNames('product-page__button', {
            'product-page__button--is-Dark': isDark,
            'product-page__button--is-Dark-Active':
              isDark && activePage === numberOfPages[numberOfPages.length - 1],
            'product-page__button--active':
              activePage === numberOfPages[numberOfPages.length - 1],
          })}
          onClick={scrollToTop}
        >
          {numberOfPages[numberOfPages.length - 1]}
        </SearchLink>
      </div>

      <SearchLink
        className={classNames({
          'product-page__button--disabled':
            activePage === numberOfPages[numberOfPages.length - 1],
        })}
        params={{ page: activePage + 1 }}
      >
        <SecondaryButton
          isDark={isDark}
          isDisabled={activePage === numberOfPages[numberOfPages.length - 1]}
          isRight
          onClickHandler={scrollToTop}
        />
      </SearchLink>
    </div>
  );
};
