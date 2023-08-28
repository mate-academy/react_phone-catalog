export const resetSearchParams = (params: URLSearchParams) => {
  const resetedParams = params
    .toString()
    .split('&')
    .filter(param => param.includes('lang'));

  return resetedParams.join('');
};
