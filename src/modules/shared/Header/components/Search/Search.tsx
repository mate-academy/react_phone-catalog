import { useContext, useEffect, useState } from 'react';
import { Close } from '../../../Icons/Close';
import classNames from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../../../../utils/searchHelper';
import { useDebounce } from '../../../../../hooks/useDebounce';
import { ThemeContext } from '../../../../../store/ThemeProvider';
import styles from './Search.module.scss';

export const Search = () => {
  const { isThemeDark } = useContext(ThemeContext);
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const applyQuery = useDebounce(setSearchParams, 1000);

  const [value, setValue] = useState(query);

  useEffect(() => {
    setValue(query);
  }, [category]);

  const handleClear = () => {
    setValue('');

    setSearchParams(
      getSearchWith(searchParams, {
        query: null,
        page: null,
      }),
    );
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);

    applyQuery(
      getSearchWith(searchParams, {
        query: e.target.value || null,
        page: null,
      }),
    );
  };

  return (
    <form
      className={classNames(styles.Search, {
        [styles.Search_darkTheme]: isThemeDark,
      })}
      onReset={handleClear}
    >
      <input
        type="search"
        placeholder="Search"
        className={styles.Search__field}
        value={value}
        onChange={handleValueChange}
      />
      <button
        type="reset"
        className={classNames(styles.Search__clearBtn, {
          [styles.Search__clearBtn_active]: value,
        })}
      >
        <Close />
      </button>
    </form>
  );
};
