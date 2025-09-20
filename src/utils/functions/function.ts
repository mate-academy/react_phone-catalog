export const getAssetUrl = (path: string) => {
  // if (import.meta.env.DEV) {
  //   return path;
  // }

  return `${import.meta.env.BASE_URL}${path}`;
};
