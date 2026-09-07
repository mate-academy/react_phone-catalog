import { useSearchParams } from 'react-router-dom';
import { getSearchWidth, Params } from '../../../shared/utils/getSearchWidth';

export const useSearchWith = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setSearchWith = (params: Params) => {
    const newParams = getSearchWidth(params, searchParams);
    setSearchParams(newParams);
  };

  return { searchParams, setSearchWith };
};
