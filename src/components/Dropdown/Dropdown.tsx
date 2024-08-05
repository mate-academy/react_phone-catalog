import classNames from 'classnames';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchParamsValue } from '../../types/SearchParamsValue';
import { SortBy } from '../../types/SortBy';
import { PerPage } from '../../types/PerPage';
import { TRANSLATIONS } from '../../utils/i18n/translations';
import { useTranslation } from 'react-i18next';
import styles from './Dropdown.module.scss';

type Props = {
  options: Partial<{ [key in SortBy | PerPage]: string }>;
  searchParam: SearchParamsValue;
  defaultOption: string;
};

export const Dropdown: React.FC<Props> = ({
  options,
  searchParam,
  defaultOption,
}) => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get(searchParam) || defaultOption;

  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [selected, setSelected] = useState<SortBy | PerPage>(
    query as SortBy | PerPage,
  );

  const handleSelect = (option: SortBy | PerPage) => {
    if (option === selected) {
      setShowOptions(false);

      return;
    }

    const params = new URLSearchParams(searchParams);

    params.set(SearchParamsValue.PAGE, '1');
    params.delete(SearchParamsValue.PAGE);

    if (option === defaultOption) {
      params.delete(searchParam);
    } else {
      params.set(searchParam, option);
    }

    setSelected(option);
    setSearchParams(params);
    setShowOptions(false);
  };

  return (
    <div className={styles.block}>
      <button
        type="button"
        className={classNames(styles.select, {
          [styles.select_m_focus]: showOptions,
        })}
        onClick={() => setShowOptions(!showOptions)}
        onBlur={() => setShowOptions(false)}
        aria-label={
          showOptions
            ? t(TRANSLATIONS.dropdown.close.ariaLabel)
            : t(TRANSLATIONS.dropdown.open.ariaLabel)
        }
      >
        {options[selected]}
      </button>

      {showOptions && (
        <ul className={styles.options}>
          {Object.entries(options).map((option, index) => {
            const [querySortBy, value] = option;

            return (
              <li
                key={index}
                className={styles.option}
                onMouseDown={() =>
                  handleSelect(querySortBy as SortBy | PerPage)
                }
              >
                {value}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
