import React, { useState } from 'react';
import styles from './SortItem.module.scss';
import { useNavigate } from 'react-router-dom';
import { getSearchWith } from '../../utils/getSearchWith';
import iconTop from '../../../../../public/img/icons/arrow-top.svg';
import iconBottom from '../../../../../public/img/icons/arrow-bottom.svg';

type Props = {
  params: string[];
  selected: string;
  sortBy: string;
  transformValue?: (value: string) => string | undefined;
  setSlicedPages: React.Dispatch<React.SetStateAction<number[]>>;
  searchParams: URLSearchParams;
  pathname: string;
};

export const SortItem: React.FC<Props> = ({
  params,
  selected,
  sortBy,
  transformValue,
  setSlicedPages,
  searchParams,
  pathname,
}) => {
  const [hasClick, setHasClick] = useState(false);
  const navigate = useNavigate();

  const handleChange = (value: string) => {
    const searchValue = transformValue?.(value) || value;

    const newParams = getSearchWith(
      { page: 1, [sortBy]: searchValue },
      searchParams,
    );

    setSlicedPages([1, 2, 3, 4]);

    navigate({ pathname, search: `?${newParams}` });
  };

  return (
    <div className={styles['products-page__sort']}>
      <div className={styles['products-page__sortby']}></div>
      <div
        className={styles['products-page__customselect']}
        onClick={() => setHasClick(prev => !prev)}
      >
        <div className={styles['products-page__wrapper']}>
          {selected}

          <img src={hasClick ? iconTop : iconBottom} alt="arrow" />
        </div>

        {hasClick && (
          <ul className={styles['products-page__customul']}>
            {params.map(param => (
              <li
                key={param}
                onClick={() => handleChange(param)}
                className={styles['products-page__customoption']}
              >
                {param}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
