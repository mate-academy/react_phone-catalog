import { AccessoriesModel, PhoneModel, TabletModel } from '../types/model';
import { getPhones, getAccessories, getTablets, getProducts } from '../api';
import { Product } from '../types/products';

export const filterByModel = async (
  model: PhoneModel | TabletModel | AccessoriesModel,
  kindOfModel: string,
) => {
  try {
    let items: (PhoneModel | TabletModel | AccessoriesModel)[] = [];

    switch (kindOfModel) {
      case 'Phones':
        items = await getPhones();
        break;
      case 'Tablets':
        items = await getTablets();
        break;

      case 'Accessories':
        items = await getAccessories();
        break;

      default:
        throw new Error(`Unknown model type: ${kindOfModel}`);
    }

    const foundModels = items.filter(item => {
      return item.namespaceId === model.namespaceId;
    });

    return foundModels;
  } catch (error) {
    throw new Error(`filterByModel failed: ${(error as Error).message}`);
  }
};

export const findModelInProducts = async (
  model: PhoneModel | TabletModel | AccessoriesModel,
): Promise<Product> => {
  const products = getProducts();

  const foundModel = products.then(productsList => {
    return productsList.find(product => product.itemId === model.id);
  });

  return foundModel as Promise<Product>;
};

export const modelsSortAsync = async (
  models: (PhoneModel | TabletModel | AccessoriesModel)[],
  sort: string,
): Promise<(PhoneModel | TabletModel | AccessoriesModel)[]> => {
  const products = await getProducts();
  const modelsWithYear = models.map(model => {
    const product = products.find(p => p.itemId === model.id);

    return {
      ...model,
      year: product?.year ?? 0,
    };
  });

  switch (sort) {
    case 'age':
      return modelsWithYear.sort((a, b) => b.year - a.year);
    case 'title':
      return modelsWithYear.sort((a, b) => a.name.localeCompare(b.name));
    case 'price':
      return modelsWithYear.sort((a, b) => {
        const priceA = a.priceDiscount ?? a.priceRegular;
        const priceB = b.priceDiscount ?? b.priceRegular;

        return priceA - priceB;
      });
    default:
      return modelsWithYear;
  }
};
