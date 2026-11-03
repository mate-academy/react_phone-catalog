export const getApi = async (type: string) => {
  let res: Response;

  switch (type.toLowerCase()) {
    case 'accessories':
      res = await fetch('/api/accessories.json');
      break;

    case 'phones':
      res = await fetch('/api/phones.json');
      break;

    case 'tablets':
      res = await fetch('/api/tablets.json');
      break;

    case 'products':
      res = await fetch('/api/products.json');
      break;

    default:
      throw new Error('Need params GetApi');
  }

  if (!res.ok) {
    throw new Error(`Erro no getApi: ${res.status}`);
  }

  return res.json();
};
