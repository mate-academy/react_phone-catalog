type Param = string | number;
export type Params = {
  [key: string]: Param[] | Param | null;
};

export const getSearchParams = (
  params: Params,
  search?: string | URLSearchParams,
) => {
  const newUrlSearchParams = new URLSearchParams(search);

  for (const [paramKey, paramValue] of Object.entries(params)) {
    if (paramValue === null) {
      newUrlSearchParams.delete(paramKey);
    } else if (Array.isArray(paramValue)) {
      newUrlSearchParams.delete(paramKey);
      paramValue.forEach(item =>
        newUrlSearchParams.append(paramKey, item.toString()),
      );
    } else {
      newUrlSearchParams.set(paramKey, paramValue.toString());
    }
  }

  return newUrlSearchParams;
};
