import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

export const useMyParams = (
  name: string,
  startValue: string,
  handleStateChange: (value: string) => void,
) => {
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    const valueFromParams = params.get(name);

    if (valueFromParams) {
      handleStateChange(valueFromParams);
    } else {
      params.set(name, startValue);
      setParams(params);
    }
  }, []);

  const handleQueryParams = (value: string) => {
    params.set(name, value);
    setParams(params);
  };

  return { handleQueryParams, params };
};
