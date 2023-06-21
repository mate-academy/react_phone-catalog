import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

export const useQueryParams = (
  name: string,
  startValue: string,
  handleStateChange?: (value: string) => void,
) => {
  const [queryParams, setParams] = useSearchParams();

  useEffect(() => {
    const valueFromParams = queryParams.get(name);

    if (valueFromParams && handleStateChange) {
      handleStateChange(valueFromParams);
    } else {
      setParams({ name: startValue });
    }
  }, []);

  const queryParam = queryParams.get(name);

  return [queryParam, setParams];
};
