import { DeviceShort } from './types/DeviceShort';

export const getData = async <T>(name: string): Promise<T> => {
  try {
    const response = await fetch(`./api/${name}.json`);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return (await response.json()) as T;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Fetch error:', error);
    throw error;
  }
};

export const sortItems = (
  items: DeviceShort[],
  searchParams: URLSearchParams,
): DeviceShort[] => {
  const params = new URLSearchParams(searchParams);

  const sort = params.get('sort');
  const perPage = params.get('perPage');
  const page = params.get('page');

  let sortedItems: DeviceShort[] = [];

  if (!sort) {
    sortedItems = [...items].sort((it1, it2) => it2.year - it1.year);
  }

  switch (sort) {
    case 'age':
      sortedItems = [...items].sort((it1, it2) => it2.year - it1.year);
      break;

    case 'price':
      sortedItems = [...items].sort((it1, it2) => it1.price - it2.price);
      break;

    case 'title':
      sortedItems = [...items].sort((it1, it2) =>
        it1.name.localeCompare(it2.name),
      );
      break;
  }

  if (!perPage) {
    return sortedItems;
  } else {
    return sortedItems.slice(
      +perPage * (page ? +page : 1) - +perPage,
      +perPage * (page ? +page : 1),
    );
  }
};
