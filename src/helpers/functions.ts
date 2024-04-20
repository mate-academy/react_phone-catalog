import { BasketGoods, Product } from '../types/product';

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

export const handleToggleBasket = (
  product: Product,
  goods: BasketGoods[],
  setGoods: React.Dispatch<React.SetStateAction<BasketGoods[]>>,
) => {
  if (goods.some(item => item.id === product.itemId)) {
    setGoods(c => c.filter(item => item.id !== product.itemId));
  } else {
    setGoods(c => [...c, { id: product.itemId, quantity: 1 }]);
  }
};
