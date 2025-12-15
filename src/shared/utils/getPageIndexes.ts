export const getPageIndexes = (currentPage: number) => {
  let firstIndex;
  let lastIndex;

  if (currentPage <= 4) {
    firstIndex = 0;
    lastIndex = firstIndex + 4;
  } else {
    lastIndex = currentPage;
    firstIndex = lastIndex - 4;
  }

  return { firstIndex, lastIndex };
};
