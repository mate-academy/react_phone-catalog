import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/hookStore';
import {
  ButtonsStyled,
  ImgStyled,
  NoResultStyled,
  PriceStyled,
  SearchItemsStyled,
  SearchListStyled,
  SearchResultStyled,
} from './styled';
import { Button } from '../../Button/Button';
import { setIsFocused, setSearchValue } from '../../../features/core';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { StrCode } from '../../../utils/enums';
import { ProductType } from '../../../types/productsType';

const SearchResult: React.FC = () => {
  const { products } = useAppSelector(state => state.products);
  const { searchValue } = useAppSelector(state => state.core);
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();

  const handleInputChange = () => {
    if (searchValue === '') {
      return [];
    }

    return products
      .filter(item => {
        switch (pathname) {
          case '/phones':
            return item.category === 'phones';
          case '/tablets':
            return item.category === 'tablets';
          case '/accessories':
            return item.category === 'accessories';
          default:
            return true;
        }
      })
      .filter(item => {
        return item.name
          .replace(/\s+/g, '')
          .toLowerCase()
          .includes(searchValue.replace(/\s+/g, '').toLowerCase());
      });
  };

  const handleClearSearch = () => {
    dispatch(setSearchValue(''));
    dispatch(setIsFocused(false));
  };

  const handleSearch = (path = 'phones') => {
    switch (pathname) {
      case '/phones':
        searchParams.set('search', searchValue);
        setSearchParams(searchParams);
        dispatch(setSearchValue(''));
        dispatch(setIsFocused(false));
        break;
      case '/tablets':
        searchParams.set('search', searchValue);
        setSearchParams(searchParams);
        dispatch(setSearchValue(''));
        dispatch(setIsFocused(false));
        break;
      case '/accessories':
        searchParams.set('search', searchValue);
        setSearchParams(searchParams);
        dispatch(setSearchValue(''));
        dispatch(setIsFocused(false));
        break;
      default:
        dispatch(setSearchValue(''));
        dispatch(setIsFocused(false));
        navigate(`/${path}?search=${searchValue}`);
        break;
    }
  };

  const isProductPathname =
    pathname === '/phones' ||
    pathname === '/tablets' ||
    pathname === '/accessories';

  const handleViewItem = (product: ProductType) => {
    navigate(`/${product.category}/${product.itemId}`);
    dispatch(setSearchValue(''));
    dispatch(setIsFocused(false));
  };

  return (
    <SearchResultStyled isActive={!!searchValue}>
      {handleInputChange().length ? (
        <SearchListStyled>
          {handleInputChange().map(item => (
            <SearchItemsStyled
              key={item.id}
              onClick={() => handleViewItem(item)}
            >
              <ImgStyled src={item.image} />

              {item.name}

              <PriceStyled>{`${item.price}$`}</PriceStyled>
            </SearchItemsStyled>
          ))}
        </SearchListStyled>
      ) : (
        <NoResultStyled>
          {t(StrCode.NotSearch)}
          <img src="/react_phone-catalog/img/product-not-found.png" />
        </NoResultStyled>
      )}

      <ButtonsStyled>
        {!!isProductPathname ? (
          <Button
            variant={handleInputChange().length ? 'dark' : 'disabled'}
            onFunc={handleInputChange().length ? handleSearch : () => {}}
          >
            {t(StrCode.SeeAll)}
          </Button>
        ) : (
          <>
            <Button
              variant={handleInputChange().length ? 'dark' : 'disabled'}
              onFunc={() =>
                handleInputChange().length ? handleSearch('phones') : {}
              }
            >
              {t(StrCode.SeePhones)}
            </Button>
            <Button
              variant={handleInputChange().length ? 'dark' : 'disabled'}
              onFunc={() =>
                handleInputChange().length ? handleSearch('tablets') : {}
              }
            >
              {t(StrCode.SeeTablets)}
            </Button>
            <Button
              variant={handleInputChange().length ? 'dark' : 'disabled'}
              onFunc={() =>
                handleInputChange().length ? handleSearch('accessories') : {}
              }
            >
              {t(StrCode.SeeAccesories)}
            </Button>
          </>
        )}
        <Button variant="white" onFunc={handleClearSearch}>
          {t(StrCode.Clear)}
        </Button>
      </ButtonsStyled>
    </SearchResultStyled>
  );
};

export default SearchResult;
