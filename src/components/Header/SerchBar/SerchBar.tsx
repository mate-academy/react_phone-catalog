import React, { useState } from 'react';
import { FormStyled, InputStyled, IconStyled } from './styled';
import { SEARCH_SVG } from '../../../utils/SVG';

const SearchForm: React.FC = () => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    setIsFocused(true);
    inputRef.current?.focus();
  };

  const handleBlur = () => {
    if (!inputRef.current?.value) {
      setIsFocused(false);
    }
  };

  return (
    <FormStyled isFocused={isFocused} onClick={handleFocus}>
      <InputStyled
        type="text"
        ref={inputRef}
        required
        isFocused={isFocused}
        onBlur={handleBlur}
      />
      <IconStyled className="fa fa-search" isFocused={isFocused}>
        <SEARCH_SVG />
      </IconStyled>
    </FormStyled>
  );
};

export default SearchForm;
