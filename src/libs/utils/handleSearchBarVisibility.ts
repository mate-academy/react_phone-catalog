export const handleSearchBarVisibility = (pathes: string[]) => {
  return (pathes.length === 1 && (pathes[0] !== '' && pathes[0] !== 'cart'));
};
