export const updateSearchParams = (
  searchParams: URLSearchParams,
  paramName: string,
  value: string,
  defaultValue: string,
  setSearchParams: (params: URLSearchParams) => void,
) => {
  const curParams = new URLSearchParams(searchParams);

  if (value === defaultValue) {
    curParams.delete(paramName);
  } else {
    curParams.set(paramName, value);
  }

  setSearchParams(curParams);
};
