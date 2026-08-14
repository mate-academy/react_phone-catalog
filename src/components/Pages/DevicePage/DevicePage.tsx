import React, { useEffect, useState } from 'react';
import Select, { SingleValue, StylesConfig } from 'react-select';
import { PageList } from './PageList';
import { SortBy, getSortBy } from '../../type/SortBy';
import { Product } from '../../type/Product';
import { PathToPage } from '../../PartToPage';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './DevicePage.scss';

type SelectOption = { value: number | 'All'; label: string };
type SortOption = { value: keyof typeof SortBy; label: string };

type Props = {
  listProduct: Product[];
  titlePage: string;
  pagePath: string;
};

export const DevicePage: React.FC<Props> = ({
  listProduct,
  titlePage,
  pagePath,
}) => {
  const { t } = useTranslation();
  const SortByType = getSortBy(t);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState<number | 'All'>(4);
  const [sortBy, setSortBy] =
    useState<keyof typeof SortByType>('Alphabetically');
  const [sortText, setSortText] = useState<string>('');
  const [sortedItems, setSortedItems] = useState<Product[]>(listProduct);

  const navigate = useNavigate();
  const location = useLocation();

  const updateSortInURL = (sortValue: keyof typeof SortByType) => {
    const searchParams = new URLSearchParams(location.search);

    searchParams.set('sort', sortValue);
    navigate({ search: searchParams.toString() });
  };

  const updateSortTextInURL = (text: string) => {
    const searchParams = new URLSearchParams(location.search);

    searchParams.set('text', text);
    navigate({ search: searchParams.toString() });
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const sortParam = searchParams.get('sort') as
      | keyof typeof SortByType
      | null;
    const textParam = searchParams.get('text') || '';

    if (sortParam && Object.keys(SortByType).includes(sortParam)) {
      setSortBy(sortParam);
    }

    if (textParam) {
      setSortText(textParam);
    }
  }, [location.search, SortByType]);

  const handleSortBy = (selectedOption: SingleValue<SortOption>) => {
    if (selectedOption) {
      setSortBy(selectedOption.value);
      updateSortInURL(selectedOption.value);
    }
  };

  const handleSortText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newText = event.target.value;

    setSortText(newText);
    updateSortTextInURL(newText);
  };

  const handleChangeSelect = (selectedOption: SingleValue<SelectOption>) => {
    if (selectedOption) {
      setPerPage(selectedOption.value);
      setCurrentPage(1);
    }
  };

  useEffect(() => {
    const filteredItems = listProduct.filter(item =>
      item.name.toLowerCase().includes(sortText.toLowerCase()),
    );

    const sortItems = [...filteredItems];

    switch (sortBy) {
      case 'Newest':
        sortItems.sort((a, b) => b.year - a.year);
        break;
      case 'Alphabetically':
        sortItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Cheapeast':
        sortItems.sort((a, b) => a.price - b.price);
        break;
      default:
        break;
    }

    setSortedItems(sortItems);
  }, [sortBy, sortText, listProduct]);

  const itemsPerPage = perPage === 'All' ? listProduct.length : perPage;

  const sortOptions: SortOption[] = Object.entries(SortByType).map(
    ([key, value]) => ({
      value: key as keyof typeof SortByType,
      label: value,
    }),
  );

  const perPageOptions: SelectOption[] = [
    { value: 4, label: '4' },
    { value: 8, label: '8' },
    { value: 16, label: '16' },
    { value: 'All', label: t('devicePage.4') },
  ];

  const customSortStyles: StylesConfig<SortOption, false> = {
    container: provided => ({
      ...provided,
      height: '40px',
      fontSize: '14px',
      fontWeight: '700',
      fontFamily: 'Monte',
      color: 'var(--text-color-dropaut-main)',
    }),

    control: (provided, state) => ({
      ...provided,
      border: state.isFocused
        ? '1px solid var(--border-color-dropaut-focus)'
        : '1px solid var(--border-color-dropaut)',
      borderRadius: 'var(--border-radius-dropaut)',
      backgroundColor: 'var(--background-color-dropaut-main)',
      height: '40px',
      boxShadow: 'none',
      fontSize: '14px',
      fontWeight: '700',
      color: 'var(--text-color-dropaut-main)',
      fontFamily: 'Monte',
      '&:hover': {
        borderColor: 'var(--border-color-dropaut-active)',
      },
    }),

    menu: provided => ({
      ...provided,
      backgroundColor: 'var(--background-color-dropaut)',
      borderRadius: 'var(--border-radius-dropaut)',
      border: '1px solid var(--border-color-dropaut)',
      boxShadow: 'none',
      padding: '4px',
    }),

    menuList: provided => ({
      ...provided,
      padding: '4px 0',
      backgroundColor: 'var(--background-color-dropaut)',
      color: 'var(--text-color-dropaut)',
    }),

    option: provided => ({
      ...provided,
      backgroundColor: 'var(--background-color-dropaut)',
      height: '38px',
      color: 'var(--text-color-dropaut)',
      padding: '8px 12px',
      margin: '2px 0',
      borderRadius: '4px',
      '&:hover': {
        backgroundColor: 'var(--background-color-dropaut-hover)',
        color: 'var(--text-color-dropaut-hover)',
      },
    }),

    singleValue: provided => ({
      ...provided,
      color: 'var(--text-color-dropaut-main)',
    }),
  };

  const customPerPageStyles: StylesConfig<SelectOption, false> = {
    container: provided => ({
      ...provided,
      height: '40px',
      fontSize: '14px',
      fontWeight: '700',
      fontFamily: 'Monte',
      color: 'var(--text-color-dropaut-main)',
    }),

    control: (provided, state) => ({
      ...provided,
      border: state.isFocused
        ? '1px solid var(--border-color-dropaut-focus)'
        : '1px solid var(--border-color-dropaut)',
      borderRadius: 'var(--border-radius-dropaut)',
      backgroundColor: 'var(--background-color-dropaut-main)',
      height: '40px',
      boxShadow: 'none',
      fontSize: '14px',
      fontWeight: '700',
      color: 'var(--text-color-dropaut-main)',
      fontFamily: 'Monte',
      '&:hover': {
        borderColor: 'var(--border-color-dropaut-active)',
      },
    }),

    menu: provided => ({
      ...provided,
      backgroundColor: 'var(--background-color-dropaut)',
      borderRadius: 'var(--border-radius-dropaut)',
      border: '1px solid var(--border-color-dropaut)',
      boxShadow: 'none',
      padding: '4px',
    }),

    menuList: provided => ({
      ...provided,
      padding: '4px 0',
      backgroundColor: 'var(--background-color-dropaut)',
      color: 'var(--text-color-dropaut)',
    }),

    option: provided => ({
      ...provided,
      backgroundColor: 'var(--background-color-dropaut)',
      height: '38px',
      color: 'var(--text-color-dropaut)',
      padding: '8px 12px',
      margin: '2px 0',
      borderRadius: '4px',
      '&:hover': {
        backgroundColor: 'var(--background-color-dropaut-hover)',
        color: 'var(--text-color-dropaut-hover)',
      },
    }),

    singleValue: provided => ({
      ...provided,
      color: 'var(--text-color-dropaut-main)',
    }),
  };

  const { i18n } = useTranslation();
  const [searchParams] = useSearchParams();
  const currentLanguage = searchParams.get('lang') || 'en';

  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, [currentLanguage, i18n]);

  return (
    <div className="device-page">
      <div className="device-page__path-to-page">
        <PathToPage arrayPath={[pagePath]} />
      </div>

      <div className="device-page__title">
        <h1 className="text--h1">{titlePage}</h1>
        <p className="text--body device-page__title--text">
          {sortedItems.length} {t('devicePage.0')}
        </p>
      </div>

      <input
        className="device-page__input"
        placeholder={t('devicePage.5')}
        value={sortText}
        onChange={handleSortText}
      />

      <div className="device-page__form">
        <div className="select__container select__container--left">
          <p className="text--small device-page__title--text">
            {t('devicePage.1')}
          </p>

          <Select
            className="select"
            value={sortOptions.find(option => option.value === sortBy)}
            onChange={handleSortBy}
            options={sortOptions}
            styles={customSortStyles}
          />
        </div>

        <div className="select__container select__container--right">
          <p className="text--small device-page__title--text">
            {t('devicePage.2')}
          </p>

          <Select
            className="select"
            value={perPageOptions.find(option => option.value === perPage)}
            onChange={handleChangeSelect}
            options={perPageOptions}
            styles={customPerPageStyles}
          />
        </div>
      </div>

      {sortedItems.length > 0 ? (
        <PageList
          total={sortedItems}
          perPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      ) : (
        <p className="text--h3 device-page__title--text">
          {t('devicePage.3')} {titlePage.toLocaleLowerCase()}
        </p>
      )}
    </div>
  );
};
