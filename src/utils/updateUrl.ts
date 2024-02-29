export const updateUrl = (params: { [key: string]: string | number }) => {
  const urlSearchParams = new URLSearchParams(window.location.search);

  Object.entries(params).forEach(([key, value]) => {
    urlSearchParams.set(key, value.toString());
  });

  const newUrl = `${window.location.pathname}?${urlSearchParams.toString()}`;

  window.history.pushState({ path: newUrl }, '', newUrl);
};
