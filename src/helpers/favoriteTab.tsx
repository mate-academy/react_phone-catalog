import { Product } from '../types/Product';

export const favList: Product[] = localStorage.getItem('fav')
  ? JSON.parse(localStorage.getItem('fav') || '')
  : [];

const catalog: Product[] = localStorage.getItem('fullList')
  ? JSON.parse(localStorage.getItem('fullList') || '')
  : [];

const findIndex = (list: Product[], favId: string) => {
  return list.findIndex(item => item.id === favId);
};

export const checkIsFavorite = (favId: string) => {
  return findIndex(favList, favId) !== -1;
};

export const favListChange = (favId: string) => {
  localStorage.removeItem('fav');

  const favIndex = findIndex(favList, favId);

  if (favIndex !== -1) {
    favList.splice(favIndex, 1);
  } else {
    const newItem = catalog.find(item => item.id === favId);

    if (newItem) {
      favList.push(newItem);
    }
  }

  localStorage.setItem('fav', JSON.stringify(favList));
};
