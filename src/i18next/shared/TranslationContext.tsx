import '../index';
import { useTranslation } from 'react-i18next';
import { createContext } from 'react';
import { NotifMessageTitle } from '../types/NotifMessageTitle';
import { ProductDetailsTitle } from '../types/ProductDetailsTitle';
import { BtnsTitle } from '../types/BtnsTitle';
import { NavListTitle } from '../types/NavListTitle';
import { Navlist } from '../../modules/shared/Enum/NavList';
import { HomePageText } from '../types/HomePageText';
import { CategoryItem } from '../types/CategoryItem';
import { SortTitle } from '../types/SortTitle';
import { SortOption } from '../types/SortOption';
import { AdditionalText } from '../types/AdditionalText';
import { SliderTitle } from '../types/SliderTitle';

type TranslationContextType = {
  homePage: HomePageText;
  categoryItem: CategoryItem[];
  sortTitle: SortTitle[];
  sortBy: SortOption[];
  sortByAmount: SortOption[];
  notifMessage: NotifMessageTitle;
  footerNavItems: string[];
  propDetailsTitle: ProductDetailsTitle;
  btnsTitle: BtnsTitle;
  navList: NavListTitle[];
  additionalText: AdditionalText;
  sliderTitle: SliderTitle;
};

export const TranslationContext = createContext<TranslationContextType>({
  homePage: {
    title: '',
    homeCategoryTitle: '',
  },

  categoryItem: [
    {
      title: '',
      category: '',
      details: '',
    },
  ],

  sortTitle: [
    {
      title: '',
      sort: 'sortBy',
    },
  ],

  sortBy: [{ label: '', sortKey: '' }],

  sortByAmount: [{ label: '', sortKey: '' }],

  notifMessage: {
    errorTitle: '',
    errorNotifTitle: '',
    alarmTitle: '',
    noProducts: '',
    cartFilledNotif: '',
    cartEmptyNotif: '',
    cartModalMessage: '',
    notif: '',
  },

  footerNavItems: [],

  propDetailsTitle: {
    tech: '',
    about: '',
    capacity: '',
    colors: '',
  },

  btnsTitle: {
    add: '',
    added: '',
    footerBack: '',
    back: '',
    cartConfirmBtn: '',
    confirm: '',
    deny: '',
    reload: '',
    sliderBtn: '',
  },

  navList: {
    link: Navlist.home,
    title: '',
  },

  additionalText: {
    itemsInCart: '',
    cartProductAmount: '',
    noCategoryMessage: '',
    productAmountCategory: '',
    searchPlaceholder: '',
  },

  sliderTitle: {
    productsNew: '',
    goodPrices: '',
    productDetailsSlider: '',
    sliderMain: [],
  },
});

export const TranslationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { t } = useTranslation();

  const homePage = t('homePage', {
    returnObjects: true,
  }) as HomePageText;

  const categoryItem = t('categoryItem', {
    returnObjects: true,
  }) as CategoryItem[];

  const sortTitle = t('sortTitle', {
    returnObjects: true,
  }) as SortTitle[];

  const sortBy = t('sortBy', {
    returnObjects: true,
  }) as SortOption[];

  const sortByAmount = t('sortByAmount', {
    returnObjects: true,
  }) as SortOption[];

  const notifMessage = t('notifMessage', {
    returnObjects: true,
  }) as NotifMessageTitle;

  const footerNavItems = t('footerNavItems', {
    returnObjects: true,
  }) as string[];

  const propDetailsTitle = t('propDetailsTitle', {
    returnObjects: true,
  }) as ProductDetailsTitle;

  const btnsTitle = t('btnsTitle', { returnObjects: true }) as BtnsTitle;
  const navList = t('navList', { returnObjects: true }) as NavListTitle[];

  const additionalText = t('additionalText', {
    returnObjects: true,
  }) as AdditionalText;

  const sliderTitle = t('sliderTitle', { returnObjects: true }) as SliderTitle;

  const value = {
    homePage,
    categoryItem,
    sortTitle,
    sortBy,
    sortByAmount,
    notifMessage,
    footerNavItems,
    propDetailsTitle,
    btnsTitle,
    navList,
    additionalText,
    sliderTitle,
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};
