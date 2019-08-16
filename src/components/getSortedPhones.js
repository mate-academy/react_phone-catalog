const getSortedPhones = (phones, sortField) => {
  switch (sortField) {
    case 'age':
      return [...phones]
        .sort((a, b) => a.age - b.age);
    case 'alphabet':
      return [...phones]
        .sort((a, b) => a.name.localeCompare(b.name));
    default:
      return phones;
  }
};

export default getSortedPhones;
