export const asset = (path: string) => {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
};

export const updateSearchParams = (
  key: string,
  value: string | number,
  searchParams: URLSearchParams,
  setSearchParams: (params: URLSearchParams) => void,
  defaultValue?: string | number,
) => {
  const params = new URLSearchParams(searchParams);

  if (!value || String(value) === String(defaultValue)) {
    params.delete(key);
  } else {
    params.set(key, String(value));
  }

  if (key === 'perPage') {
    params.delete('page');
  }

  setSearchParams(params);
};
