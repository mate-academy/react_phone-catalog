type Params = (
  searchParams: URLSearchParams,
  value: string,
  defaultvalue: string,
  param: string,
) => void;

export const updateSearchParams: Params = (
  searchParams,
  value,
  defaultValue,
  param,
) => {
  if (value === defaultValue) {
    searchParams.delete(param);
  } else {
    searchParams.set(param, value);
  }
};
