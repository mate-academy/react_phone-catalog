export const getLinkFromRAM = (id: string, str: string, path: string) => {
  const splited = id.split('-');

  const popped = splited.pop() || '';

  splited.pop();
  splited.push(str.toLowerCase());
  splited.push(popped);
  const category = path.slice(1).split('/')[0];

  return `/${category}/${splited.join('-')}`;
};
