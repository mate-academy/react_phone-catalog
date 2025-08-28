import { CatalogueProduct } from '@shared/types/APIReturnTypes';

type Conf = {
  key: string;
  getter: () => Promise<{
    data: CatalogueProduct[];
    currentPage: number;
    pages: number;
  }>;
  setter: (data: CatalogueProduct[]) => void;
};

export { type Conf };
