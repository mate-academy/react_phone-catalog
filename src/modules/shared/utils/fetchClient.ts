// import phonesData from '../../../../public/api/phones.json';
// import tabletsData from '../../../../public/api/tablets.json';
// import accessoriesData from '../../../../public/api/accessories.json';

export function fetchData<T>(data: T, delay: number): Promise<T> {
  return new Promise(resolve => {
    setTimeout(() => resolve(data), delay);
  });
}
