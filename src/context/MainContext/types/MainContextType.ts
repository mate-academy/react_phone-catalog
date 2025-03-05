import { Product } from '../../../types/CategoriesTypes/Product';
import { ErrorType } from './ErrorType';

export interface MainContextType {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isMenuShowed: boolean;
  mobImgs: string[];
  imgs: string[];
  imgIndex: number;
  isOnHomePage: boolean;
  isLoading: boolean;
  isError: ErrorType;
  isFooterAbsPos: boolean;
  currentProductProps: Product | null;
  MWFValueCondition: boolean;
  modelOnClickHandler: (
    category: string,
    itemId: string,
    props?: Product,
  ) => void;
  scrollToTopHandler: (value: number) => void;
  setIsMenuShowed: (value: boolean) => void;
  setImgIndex: React.Dispatch<React.SetStateAction<number>>;
  repeatColor: (query: string, times: number) => void;
  setIsLoading: (value: boolean) => void;
  setIsError: React.Dispatch<React.SetStateAction<ErrorType>>;
  setIsFooterAbsPos: (value: boolean) => void;
  setCurrentProductProps: (value: Product | null) => void;
}
