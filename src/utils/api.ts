export const getNewModels = () => {
  return fetch('/api/phones.json')
    .then(response => response.json())
    .then(data =>
      data.filter(
        (item: { capacity: string; name: string }) =>
          item.capacity === '1TB' ||
          (item.name.includes('14') && item.name.includes('128')),
      ),
    );
};
