export const getLinkFromColor = (id: string, str: string, path: string) => {
  const splited = id.split('-');

  splited.pop();
  splited.push(str);
  const category = path.slice(1).split('/')[0];

  return `/${category}/${splited.join('-')}`;
};
