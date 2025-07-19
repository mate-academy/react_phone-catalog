import products from '../../public/api/products.json';

type CategoryInfo = {
  category: string;
  title: string;
  count: number;
  image: string;
};

const titles = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

const images = {
  phones: '/img/categories/phones.png',
  tablets: '/img/categories/tablets.png',
  accessories: '/img/categories/accessories.png',
};

export const getCategoriesData = (): CategoryInfo[] => {
  const counts: { [key: string]: number } = {};

  for (const product of products) {
    const category = product.category;

    if (counts[category]) {
      counts[category]++;
    } else {
      counts[category] = 1;
    }
  }

  const result: CategoryInfo[] = [];

  for (const category in counts) {
    result.push({
      category,
      title: titles[category],
      count: counts[category],
      image: images[category],
    });
  }

  return result;
};
