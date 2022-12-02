export const generateSlug = ({ type, id }: Pick<Product, 'type' | 'id'>) => {
  let directory: string;

  switch (type) {
    case 'phone':
      directory = 'phones';
      break;
    case 'tablet':
      directory = 'tablets';
      break;
    case 'accessory':
      directory = 'accessories';
      break;
    default:
      return '/';
  }

  return `/${directory}/${id}`;
};
