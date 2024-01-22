const getFirstItem = (itemsPerPage: number, page: number) => {
  return (itemsPerPage * page) - (itemsPerPage - 1) - 1;
};

const getLastItem = (
  itemsPerPage: number,
  page: number,
  maxItems: number,
) => {
  if ((itemsPerPage * page) >= maxItems) {
    return maxItems;
  }

  return itemsPerPage * page;
};

export {
  getFirstItem,
  getLastItem,
};
