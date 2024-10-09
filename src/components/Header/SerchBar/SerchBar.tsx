import React from 'react';
import { FormStyled, InputStyled, IconStyled } from './styled';
import { SEARCH_SVG } from '../../../utils/SVG';
import { useTranslation } from 'react-i18next';
import { StrCode } from '../../../utils/enums';
import { useAppDispatch, useAppSelector } from '../../../hooks/hookStore';
import { setIsFocused, setSearchValue } from '../../../features/core';

const SearchForm: React.FC = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  const { searchValue } = useAppSelector(state => state.core);
  const { isFocused } = useAppSelector(state => state.core);
  const dispatch = useAppDispatch();

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchValue(e.target.value));
  };

  const handleFocus = () => {
    dispatch(setIsFocused(true));
    inputRef.current?.focus();
  };

  const handleBlur = () => {
    if (!inputRef.current?.value) {
      dispatch(setIsFocused(false));
    }
  };

  return (
    <FormStyled isFocused={isFocused} onClick={handleFocus}>
      <InputStyled
        type="text"
        ref={inputRef}
        value={searchValue}
        isFocused={isFocused}
        onChange={handleChangeValue}
        onBlur={handleBlur}
        placeholder={t(StrCode.SearchText)}
      />
      <IconStyled className="fa fa-search" isFocused={isFocused}>
        <SEARCH_SVG />
      </IconStyled>
    </FormStyled>
  );
};

export default SearchForm;
