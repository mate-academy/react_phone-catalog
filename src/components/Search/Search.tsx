import {
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Icon } from '../Icon';
import { IconType } from '../../types/Icon';
import { getSearchWith } from '../../utils/searchHelper';
import { useWindowSize } from '../../app/hooks';
import { SIZE_MOBILE } from '../../app/consts';
import './Search.scss';

type Props = {
  isMenuOpened: boolean,
  handleOpenMenu: () => void,
};

export const Search: React.FC<Props> = ({ isMenuOpened, handleOpenMenu }) => {
  const { width } = useWindowSize();

  const location = useLocation();
  const currLocation = location.pathname.slice(1);

  const [isMobileMode, setIsMobileMode] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const placeholderText = isMobileMode
    ? ''
    : `Search in ${currLocation}...`;

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(
        searchParams, {
          query: event.target.value || null,
        },
      ),
    );
  };

  const handleDeleteQuery = () => {
    if (isMobileMode) {
      setIsOpened(true);
    }

    setSearchParams(
      getSearchWith(
        searchParams, {
          query: '',
        },
      ),
    );
  };

  const handleSearchMobile = useCallback(() => {
    if (isMenuOpened) {
      handleOpenMenu();
    }

    setIsOpened(prevStatus => !prevStatus);
  }, [isMenuOpened]);

  const handleClick = () => {
    setIsOpened(false);
  };

  useEffect(() => {
    if (width < SIZE_MOBILE) {
      setIsMobileMode(true);
    } else {
      setIsMobileMode(false);
    }
  }, [width]);

  useEffect(() => {
    if (isMenuOpened) {
      setIsOpened(false);
    }
  }, [isMenuOpened]);

  return (
    <>
      {isMobileMode && (
        <button
          className="search__icon"
          type="button"
          onClick={handleSearchMobile}
        >
          <Icon type={IconType.SEARCH} />
        </button>
      )}

      <div className={classNames(
        'search',
        {
          search__mobile: isMobileMode,
          'search__mobile--active': isOpened,
        },
      )}
      >
        <input
          className="search__input"
          value={query}
          type="text"
          onBlur={handleClick}
          placeholder={placeholderText}
          onChange={handleChangeQuery}
        />

        {query ? (
          <button
            className="search__button"
            data-cy="searchDelete"
            type="button"
            onClick={handleDeleteQuery}
          >
            <Icon type={IconType.CROSS} />
          </button>
        ) : (
          <span
            role="button"
            tabIndex={0}
            onClick={handleClick}
            onKeyDown={handleClick}
          >
            <Icon type={IconType.SEARCH} />
          </span>
        )}
      </div>
    </>
  );
};
