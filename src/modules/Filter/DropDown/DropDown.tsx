import React, { useEffect, useState } from 'react';
import styles from './DropDown.module.scss';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import chevronBottom from './../../../images/icons/chevron-bottom.svg';
import { SortBy } from '../../../utils/enums/sortBy';
import { PerPage } from '../../../utils/enums/perPage';
import { SortVariants } from '../../../utils/enums/sortVariants';

type Props = {
  sortFields: SortBy[] | PerPage[];
  queryParams: SortVariants;
  label: string;
};

export const DropDown: React.FC<Props> = ({
  sortFields,
  queryParams,
  label,
}) => {
  const [selectedField, setSelectedField] = useState<null | string>(null);

  const [expand, setExpand] = useState<boolean>(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const params = new URLSearchParams(searchParams);

  const setCurrentField = (e: React.MouseEvent<HTMLButtonElement>) => {
    setExpand(toggleExpand => !toggleExpand);
    e.stopPropagation();
  };

  const setActiveField = (sortField: string) => {
    setSelectedField(sortField);
    setExpand(false);

    params.set(queryParams, sortField);

    setSearchParams(params);
  };

  useEffect(() => {
    const handleDocumentClick = () => {
      setExpand(false);
    };

    if (!expand) {
      return;
    }

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [expand]);

  const handleSelectSortField = (sortField: SortBy | PerPage) => {
    params.set('page', '1');

    setSearchParams(params);
    setActiveField(String(sortField));
  };

  return (
    <div className={styles.dropdown}>
      <span className={styles.dropdown__label}>{label}</span>
      <button
        className={classNames(styles.dropdown__button, {
          [styles.dropdown__button_up]: expand,
        })}
        onClick={e => setCurrentField(e)}
      >
        {params.get(queryParams) || sortFields[0]}
        <img src={chevronBottom} alt="Chevron bottom" />
      </button>
      {expand && (
        <ul className={styles.dropdown__items}>
          {sortFields.map(sortField => (
            <li key={sortField}>
              <button
                onMouseDown={() => {
                  handleSelectSortField(sortField);
                }}
                className={classNames(styles.dropdown__item, {
                  [styles.dropdownActive]: selectedField === sortField,
                })}
              >
                {sortField}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
