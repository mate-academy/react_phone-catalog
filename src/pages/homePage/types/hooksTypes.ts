import { BaseProduct } from '@shared/types/APIReturnTypes';

type LoadState = {
  banners: boolean;
  newest: boolean;
  hotPrice: boolean;
};

type ErrorState = {
  banners: null | string;
  newest: null | string;
  hotPrice: null | string;
};

type Conf = {
  key: string;
  getter: () => Promise<{
    data: BaseProduct[];
    currentPage: number;
    pages: number;
  }>;
  setter: (data: BaseProduct[]) => void;
};

export { type LoadState, type ErrorState, type Conf };
