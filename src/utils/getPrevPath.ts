export const getPrevPath = (pathname: string) => {
  return pathname
    .split('/')
    .filter(path => path !== '')
    .map(path => '/' + path)
    .slice(0, -1)
    .join('');
};
