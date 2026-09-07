export const getPaginationItems = (
  currentPage: number,
  totalPages: number,
  maxLength = 7,
): number[] => {
  const result: number[] = [];

  if (totalPages <= maxLength) {
    for (let i = 1; i <= totalPages; i++) {
      result.push(i);
    }
  } else {
    const firstPage = 1;
    const confirmedPagesCount = 3;
    const deductedMaxLength = maxLength - confirmedPagesCount;
    const sideLength = Math.floor(deductedMaxLength / 2);

    if (
      currentPage - firstPage < sideLength ||
      totalPages - currentPage < sideLength
    ) {
      for (let j = firstPage; j <= firstPage + sideLength; j++) {
        result.push(j);
      }

      result.push(NaN);

      for (let k = totalPages - sideLength; k <= totalPages; k++) {
        result.push(k);
      }
    } else if (
      currentPage - firstPage >= deductedMaxLength &&
      totalPages - currentPage >= deductedMaxLength
    ) {
      const deductedSideLength = sideLength - 1;

      result.push(firstPage);
      result.push(NaN);

      for (
        let l = currentPage - deductedSideLength;
        l <= currentPage + deductedSideLength;
        l++
      ) {
        result.push(l);
      }

      result.push(NaN);
      result.push(totalPages);
    } else {
      const isNearFirstPage =
        currentPage - firstPage < totalPages - currentPage;
      let remainingLength = maxLength;

      if (isNearFirstPage) {
        for (let m = firstPage; m <= currentPage + 1; m++) {
          result.push(m);
          remainingLength -= 1;
        }

        result.push(NaN);
        remainingLength -= 1;

        for (let n = totalPages - (remainingLength - 1); n <= totalPages; n++) {
          result.push(n);
        }
      } else {
        for (let o = totalPages; o >= currentPage - 1; o--) {
          result.unshift(o);
          remainingLength -= 1;
        }

        result.unshift(NaN);
        remainingLength -= 1;

        for (let p = remainingLength; p >= firstPage; p--) {
          result.unshift(p);
        }
      }
    }
  }

  return result;
};
