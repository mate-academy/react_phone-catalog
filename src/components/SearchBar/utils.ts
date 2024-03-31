export const generatePlaceHolderText = (pathname: string) => {
  switch (pathname) {
    case '/phones':
    case '/tablets':
    case '/accessories':
    case '/favourites':
      return `Search in ${pathname.slice(1)}...`;
    default:
      return 'Search...';
  }
};
