import cn from 'classnames';
import styles from './Search.module.scss';
import { useUpdateSearchParams } from '../../../../hooks';
import { useEffect, useState } from 'react';
import { SvgIcon } from '../../../../components/SvgIcon';

interface Props {
  className?: string;
}

export const Search: React.FC<Props> = ({ className }) => {
  const { updateSearchParams, deleteSearchParam, searchParams } =
    useUpdateSearchParams();
  const [value, setValue] = useState(searchParams.get('query') || '');

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (value) {
        updateSearchParams('query', value);
      } else {
        deleteSearchParam('query');
      }
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [deleteSearchParam, updateSearchParams, value]);

  const onInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
  };

  const clear = () => {
    setValue('');
  };

  return (
    <div className={cn(styles.search, className)}>
      <label htmlFor="search" className={styles.search__title}>
        Search
      </label>
      <div className={styles['search__input-wrapper']}>
        <input
          id="search"
          className={styles.search__input}
          type="text"
          onChange={onInputChange}
          value={value}
        />
        {value && (
          <button className={styles.search__clear} onClick={clear}>
            <SvgIcon type="close" />
          </button>
        )}
      </div>
    </div>
  );
};
