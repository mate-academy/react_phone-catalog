export const handleSearchBarVisibility = (pathes: string[]) => {
  if (pathes.length === 1 && (pathes[0] !== '' && pathes[0] !== 'cart')) {
    return true;
  }

  return false;
};
