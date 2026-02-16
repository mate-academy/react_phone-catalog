export const getPaginationItems = (
  currentPage: number,
  lastPage: number,
  maxLength = 5,
) => {
  const res: Array<number | string> = [];

  if (lastPage <= maxLength) {
    for (let i = 1; i <= lastPage; i++) {
      res.push(i);
    }

    return res;
  }

  res.push(1);

  if (currentPage < maxLength - 2) {
    for (let i = 2; i < maxLength - 1; i++) {
      res.push(i);
    }

    res.push('...');
    res.push(lastPage);
  } else if (currentPage > lastPage - (maxLength - 3)) {
    res.push('...');

    for (let i = lastPage - (maxLength - 3); i <= lastPage; i++) {
      res.push(i);
    }
  } else {
    res.push('...');
    res.push(currentPage - 1);
    res.push(currentPage);
    res.push(currentPage + 1);
    res.push('...');
    res.push(lastPage);
  }

  return res;
};
