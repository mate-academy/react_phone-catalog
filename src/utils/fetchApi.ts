// enum Sort {
//   Newest = 'newest',
//   Alphabetically = 'Alphabetically',
//   Cheapest = 'Cheapest',
// }

// type Filter = {
//   itemQuantity: number;
//   page: number;
//   sort: Sort;
//   id: string;
// };

export const getProductsByCategory = async (category: string) => {
  try {
    const response = await fetch(
      `/api/${category}.trasnformed.json`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
  }
  return [];
};

export const getDisplayProducts = async () => {
  try {
    const response = await fetch('../../public/api/products.json');
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
  }
};
