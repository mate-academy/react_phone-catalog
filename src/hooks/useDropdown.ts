import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { TOptions } from '@utils/constants/optionsForSort';
import { getSearchWith } from '@utils/helpers/searchHelpers';

import { useAction } from './useActions';

type TUseDropdown = {
  options: TOptions[];
  setItemPerPage: (value: number) => void;
  setCurrentPage: (value: number) => void;
  initialPerPage: number;
};

export const useDropdown = ({
  options,
  setItemPerPage,
  setCurrentPage,
  initialPerPage,
}: TUseDropdown) => {
  const { setSortBy } = useAction();
  const [searchParams, setSearchParams] = useSearchParams();
  const sortParam = searchParams.get('sort');

  const [selectedValue, setSelectedValue] = useState<number | string>(
    options.length > 0 ? options[0].value : '',
  );

  useEffect(() => {
    setItemPerPage(initialPerPage);
    setSelectedValue(initialPerPage);
  }, [initialPerPage, setItemPerPage]);

  const handleSort = (value: string) => {
    setSortBy(value);
    const search = getSearchWith({ sort: value }, searchParams);
    setSearchParams(search, { replace: true });
  };

  const handlePerPage = (value: number) => {
    const search = getSearchWith({ perPage: value }, searchParams);
    setSearchParams(search, { replace: true });
    setItemPerPage(value);
    setCurrentPage(1);
  };

  const onOptionSelect = useCallback(
    (value: string | number) => {
      setSelectedValue(value);

      if (typeof value === 'string') {
        handleSort(value);
      } else if (typeof value === 'number') {
        handlePerPage(value);
      }
    },
    [searchParams, setSearchParams, setItemPerPage, setSortBy, setCurrentPage],
  );

  const currentOption = useMemo(() => {
    return (
      options.find(
        option => option.value === sortParam || option.value === initialPerPage,
      )?.label || options[0]?.label
    );
  }, [options, sortParam, initialPerPage]);

  return {
    selectedValue,
    currentOption,
    onOptionSelect,
  };
};
