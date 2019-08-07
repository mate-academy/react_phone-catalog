const getFilteredByNamePhones = (phones, filterValue) => {
  const filterPhones = phones.filter(phone => (
    phone.name.toLowerCase().includes(filterValue.toLowerCase())
  ));

  return filterPhones;
};

const getSortedPhones = (phones, sortValue) => {
  const sortPhones = [...phones].sort((a, b) => {
    switch (sortValue) {
      case 'abc':
        return a.name.localeCompare(b.name);

      case 'newest':

        return a.age - b.age;

      default:

        return 0;
    }
  });

  return sortPhones;
};

const cashingFabric = (funcToCash) => {
  let prevArgs = [];
  let prevValue = [];

  return (...args) => {
    if (args.every((arg, i) => arg === prevArgs[i])) {
      return prevValue;
    }

    prevArgs = args;
    prevValue = funcToCash(...args);

    return prevValue;
  };
};

export const cashedFilteredPhones = cashingFabric(getFilteredByNamePhones);
export const cashedSorteredPhones = cashingFabric(getSortedPhones);
