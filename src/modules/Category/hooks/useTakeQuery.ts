import { useSearchParams } from 'react-router-dom';

import { getValidOption } from '../../../utils/getValidOption';
import { getHandleTakeChange } from '../utils/getHandleTakeChange';
import {
  QUERY_KEY,
  TAKE_SELECT_OPTIONS,
  takeSelectDefaultOption,
} from '../variables';

export const useTakeQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const takeOption = getValidOption(
    TAKE_SELECT_OPTIONS,
    searchParams.get(QUERY_KEY.TAKE) || '',
    takeSelectDefaultOption,
  );

  const handleTakeChange = getHandleTakeChange(
    setSearchParams,
    searchParams,
    QUERY_KEY.TAKE,
    { [QUERY_KEY.PAGE]: null },
  );

  return [takeOption, handleTakeChange] as const;
};
