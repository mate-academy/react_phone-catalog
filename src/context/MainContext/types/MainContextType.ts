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
  modelOnClickHandler: (name: string, category: string, itemId: string) => void;
  scrollToTopHandler: (value: number) => void;
  setIsMenuShowed: (value: boolean) => void;
  setImgIndex: React.Dispatch<React.SetStateAction<number>>;
  repeatColor: (query: string, times: number) => void;
  setIsLoading: (value: boolean) => void;
}
