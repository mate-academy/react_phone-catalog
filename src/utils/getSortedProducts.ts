// import { Phones } from '../types/Phones';
import { Products } from '../types/Products';

export const getSortedProducts = (
  productData: Products[],
  sort: string,
  query?: string,
) => {
  let sortedProducts = [...productData];

  if (sort === 'Newest') {
    sortedProducts = sortedProducts.sort(
      (itemA, itemB) => itemA.year - itemB.year,
    );
  }

  if (sort === 'Alphabet') {
    sortedProducts = sortedProducts.sort(
      (itemA, itemB) => itemA.name.localeCompare(itemB.name),
    );
  }

  if (sort === 'Chepest') {
    sortedProducts = sortedProducts.sort(
      (itemA, itemB) => itemA.price - itemB.price,
    );
  }

  if (query) {
    const queryFilter = (param?: string | null) => {
      return param
        ? param.toLowerCase().includes(query.toLowerCase())
        : null;
    };

    sortedProducts = sortedProducts.filter(
      product => queryFilter(product.name),
    );
  }

  return sortedProducts || null;
};

// export const getFiltredPhones = useMemo((
//   productData: Phones[],
//   sort: string,
//   query?: string,
// ) => {
//   const queryToLowerCase = query?.toLowerCase();
//   const toFilter = productData.filter(item => {
//     const filterInput = item.name.toLowerCase().includes(queryToLowerCase);

//     switch (sort) {
//       case 'Newest':
//         return dataPhones.sort((a, b) => b.year - a.year)
//           && filterInput;
//       case FilterType.Name:
//         return dataPhones.sort((a, b) => a.name.localeCompare(b.name))
//           && filterInput;
//       case FilterType.Price:
//         return dataPhones.sort((a, b) => b.fullPrice - a.fullPrice)
//           && filterInput;
//       default:
//         return item;
//     }
//   });

//   return toFilter;
// }, [sort, productData]);
