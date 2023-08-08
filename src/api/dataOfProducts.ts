// import { Goods } from '../types/goods';
import { Phone } from '../types/phone';
import { PhoneDetails } from '../types/phoneDetails';
import { client } from '../utils/fetchClient';

export const getData = () => {
  return client.get<Phone[]>('.json');
};

export const getPhoneDetails = (phoneId: string) => {
  return client.get<PhoneDetails>(`/${phoneId}.json`);
};

export function changePath(
  dataToChange: Phone[],
  on = 'img/phones/',
  to = '_new/img/phones/',
): Phone[] {
  const dataWithChangePath = dataToChange.map(el => {
    const path = el.image.replaceAll(on, to);

    return { ...el, image: path };
  });

  return dataWithChangePath;
}

export const getHotPriceProducts = (data: Phone[], isChangePath = true) => {
  const sortedData = [...data].sort((a, b) => {
    const absolutelyDiscountA = a.fullPrice - a.price;
    const absolutelyDiscountB = b.fullPrice - b.price;

    return (absolutelyDiscountB - absolutelyDiscountA);
  });

  if (isChangePath) {
    return changePath(sortedData);
  }

  return sortedData;
};

export const getBrandNewProducts = (data: Phone[], isChangePath = true) => {
  const sortedData = [...data].sort((a, b) => b.price - a.price);

  if (isChangePath) {
    return changePath(sortedData);
  }

  return sortedData;
};

export const getProductsSortByName = (data: Phone[], isChangePath = true) => {
  const sortedData = [...data].sort((a, b) => a.name.localeCompare(b.name));

  if (isChangePath) {
    return changePath(sortedData);
  }

  return sortedData;
};

export const randomizeData = (data: Phone[]) => {
  const newArray = [...data];

  for (let i = newArray.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));

    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return changePath(newArray);
};

export const getSortedProducts = (
  data: Phone[],
  sortBy: string,
  isChangePath = true,
) => {
  const sortedData = [...data].sort((a, b) => {
    const absolutelyDiscountA = a.fullPrice - a.price;
    const absolutelyDiscountB = b.fullPrice - b.price;

    switch (sortBy) {
      case 'new':
        return b.price - a.price;
      case 'hotPrice':
        return (absolutelyDiscountB - absolutelyDiscountA);
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price':
        return a.price - b.price;
      case 'age':
      default:
        return b.year - a.year;
    }
  });

  if (isChangePath) {
    return changePath(sortedData);
  }

  return sortedData;
};

// export const getData = () => {
//   return client.get<Goods[]>('.json');
// };

// export const getHotPriceProducts = (data: Goods[]) => {
//   const filteredData = data.filter((item) => item.discount > 0);
//   const sortedData = filteredData.sort((a, b) => {
//     const absolutelyDiscountA = (a.price / 100) * a.discount;
//     const absolutelyDiscountB = (b.price / 100) * b.discount;

//     return (absolutelyDiscountB - absolutelyDiscountA);
//   });

//   const dataWithChangePath = sortedData.map(el => {
//     const path = el.imageUrl.replaceAll('/phones/', '/products/');

//     return { ...el, imageUrl: path };
//   });

//   return (dataWithChangePath);
// };

// export const getBrandNewProducts = (data: Goods[]) => {
//   const filteredData = data.filter((item) => item.discount === 0);
//   const sortedData = filteredData.sort((a, b) => b.price - a.price);

//   const dataWithChangePath = sortedData.map(el => {
//     const path = el.imageUrl.replaceAll('/phones/', '/products/');

//     return { ...el, imageUrl: path };
//   });

//   return (dataWithChangePath);
// };
