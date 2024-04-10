import { SearchWithParams } from '../types/main';

export const getSearchWith = (
  params: SearchWithParams,
  search?: string | URLSearchParams,
) => {
  const newParams = new URLSearchParams(search);

  Object.entries(params).forEach(([key, value]) => {
    if (value === null) {
      newParams.delete(key);
    } else if (Array.isArray(value)) {
      newParams.delete(key);
      value.forEach(item => newParams.append(key, item.toString()));
    } else {
      newParams.set(key, value.toString());
    }
  });

  return newParams.toString();
};

export const convertHyphenToSpace = (str: string) => {
  return str
    .split('-')
    .map((word, index) =>
      index === 0
        ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        : word,
    )
    .join(' ');
};

export const convertSpaceToHyphen = (str: string) => {
  return str
    .split(' ')
    .map(word => word.toLowerCase())
    .join('-');
};

export const extractFirstNumber = (str: string) => {
  const match = str.match(/\d+/);

  if (match) {
    return parseInt(match[0], 10);
  }

  return 0;
};

export const getPaginationItems = (
  currentPage: number,
  lastPage: number,
  maxLength: number,
) => {
  const res: Array<number> = [];

  if (lastPage <= maxLength) {
    for (let i = 1; i <= lastPage; i += 1) {
      res.push(i);
    }
  } else {
    const firstPage = 1;
    const confirmedPagesCount = 3;
    const deductedMaxLength = maxLength - confirmedPagesCount;
    const sideLength = deductedMaxLength / 2;

    if (
      currentPage - firstPage < sideLength ||
      lastPage - currentPage < sideLength
    ) {
      for (let j = 1; j <= sideLength + firstPage; j += 1) {
        res.push(j);
      }

      res.push(NaN);

      for (let k = lastPage - sideLength; k <= lastPage; k += 1) {
        res.push(k);
      }
    } else if (
      currentPage - firstPage >= deductedMaxLength &&
      lastPage - currentPage >= deductedMaxLength
    ) {
      const deductedSideLength = sideLength - 1;

      res.push(1);
      res.push(NaN);

      for (
        let l = currentPage - deductedSideLength;
        l <= currentPage + deductedSideLength;
        l += 1
      ) {
        res.push(l);
      }

      res.push(NaN);
      res.push(lastPage);
    } else {
      const isNearFirstPage = currentPage - firstPage < lastPage - currentPage;
      let remainingLength = maxLength;

      if (isNearFirstPage) {
        for (let m = 1; m <= currentPage + 1; m += 1) {
          res.push(m);
          remainingLength -= 1;
        }

        res.push(NaN);
        remainingLength -= 1;

        for (let n = lastPage - (remainingLength - 1); n <= lastPage; n += 1) {
          res.push(n);
        }
      } else {
        for (let o = lastPage; o >= currentPage - 1; o -= 1) {
          res.unshift(o);
          remainingLength -= 1;
        }

        res.unshift(NaN);
        remainingLength -= 1;

        for (let p = remainingLength; p >= 1; p -= 1) {
          res.unshift(p);
        }
      }
    }
  }

  return res.map((pageNum, index) => ({
    pageNum,
    id: Math.random() + index,
  }));
};

export const getRandomItemsFromArray = <T>(
  array: Array<T>,
  amount: number,
): T[] => {
  const result = [];

  for (let i = 0; i < amount; i++) {
    const randomIndex = Math.floor(Math.random() * array.length);
    const el = array[randomIndex];

    result.push(el);
  }

  return result;
};

export const toggleItemInArray = <T>(array: Array<T>, item: T) => {
  const index = array.indexOf(item);
  const result = [...array];

  if (index === -1) {
    result.push(item);
  } else {
    result.splice(index, 1);
  }

  return result;
};

export const toggleObjectInArrayById = <T>(array: Record<'id', T>[], id: T) => {
  const index = array.findIndex(item => item.id === id);
  const result = [...array];

  if (index === -1) {
    result.push({ id });
  } else {
    result.splice(index, 1);
  }

  return result;
};
