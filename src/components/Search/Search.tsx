import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch } from '../../app/hooks';
import * as queryActions from '../../app/features/querySlice';
import './Search.scss';

type Props = {
  pageName: string;
};

const debounce = (f: (query: string) => void, delay: number) => {
  let timerId: number;

  return (...args: string[]) => {
    clearTimeout(timerId);

    timerId = window.setTimeout(f, delay, ...args);
  };
};

export const Search: React.FC<Props> = ({
  pageName,
}) => {
  const [appliedQuery, setAppliedQuery] = useState('');
  const [value, setValue] = useState('');
  const dispatch = useAppDispatch();

  const applyQuery = useCallback(
    debounce(setAppliedQuery, 1000), [],
  );

  const handlerInputOnChange = (newQuery: string) => {
    setValue(newQuery);
    applyQuery(newQuery);
  };

  const handlerCrossButtonClick = () => {
    setValue('');
    setAppliedQuery('');
    dispatch(queryActions.deleteQuery());
  };

  useEffect(() => {
    dispatch(queryActions.setQuery(appliedQuery));
  }, [appliedQuery]);

  return (
    <div className="Search">
      <input
        type="text"
        value={value}
        className="Search__input text"
        placeholder={`Search in ${pageName}...`}
        onChange={(e) => handlerInputOnChange(e.currentTarget.value)}
      />

      <button
        data-cy="searchDelete"
        aria-label="searchDelete"
        type="button"
        className={classNames(
          'Search__button',
          { 'cross-button': value },
        )}
        onClick={handlerCrossButtonClick}
      />
    </div>
  );
};
