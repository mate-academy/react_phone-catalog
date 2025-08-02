import React from 'react';
import styles from './CatalogControls.module.scss';

import { useTranslation } from 'react-i18next';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { DefaultValues } from '../../../../../../../enums/DefaultValues';
import { ItemPerPage } from '../../../../../../../enums/ItemsPerPage';
import { SearchParam } from '../../../../../../../enums/SearchFields';
import { SortBy } from '../../../../../../../enums/SortBy';
import { enumToDropdownOptions } from '../../../../../../../helpers/enumToOptions';
import { getSearchWith } from '../../../../../../../helpers/searchHelper';
import { Dropdown } from '../../../../../molecules/Dropdown';
import { DropdownOption } from '../../../../../../../types/DropdownOption';

export const CatalogControls: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const optionsSort: DropdownOption[] = enumToDropdownOptions(
    SortBy,
    t,
    'catalog.dropdown.sortBy.options',
  );
  const optionsProdPerPage: DropdownOption[] = enumToDropdownOptions(
    ItemPerPage,
    t,
    'catalog.dropdown.sortBy.options',
  );

  const currentSortBy = searchParams.get(SearchParam.Sort);
  const currentPerPage = searchParams.get(SearchParam.PerPage);

  const selectedSortBy = optionsSort.find(
    option => option.value === (currentSortBy || DefaultValues.Sort),
  )!;
  const selectedPerPage = optionsProdPerPage.find(
    option => option.value === (currentPerPage || DefaultValues.PerPage),
  )!;

  const handleSortByChange = (newValue: DropdownOption | null) => {
    const updatedSearch = getSearchWith(searchParams, {
      [SearchParam.Sort]:
        (newValue?.value !== DefaultValues.Sort && newValue?.value) || null,
      [SearchParam.Page]: null,
    });

    navigate({ search: updatedSearch });
  };

  const handlePerPageChange = (newValue: DropdownOption | null) => {
    const updatedSearch = getSearchWith(searchParams, {
      [SearchParam.PerPage]:
        (newValue?.value !== DefaultValues.PerPage && newValue?.value) || null,
      [SearchParam.Page]: null,
    });

    navigate({ search: updatedSearch });
  };

  return (
    <div className={styles.controls}>
      <div className={styles.controls__sort}>
        <Dropdown
          label={t('catalog.dropdown.sortBy.label')}
          options={optionsSort}
          value={selectedSortBy}
          onChange={handleSortByChange}
        />
      </div>
      <div className={styles.controls__quantity}>
        <Dropdown
          label={t('catalog.dropdown.perPage.label')}
          options={optionsProdPerPage}
          value={selectedPerPage}
          onChange={handlePerPageChange}
        />
      </div>
    </div>
  );
};
