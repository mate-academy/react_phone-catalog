import './Search.scss';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import { setQuery } from '../../store/actions';

export const Search: React.FC = () => {
  const dispatch = useDispatch();

  const [value, setValue] = React.useState('');

  const handlerPressEnterSearch = () => {
    dispatch(setQuery(value));
  };

  React.useEffect(() => {
    const keyDownHandler = (
      event: { key: string; preventDefault: () => void; },
    ) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        handlerPressEnterSearch();
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [value]);

  const visibleSearch = window.location.hash;

  return (
    <div className={
      ((/(phones$)/).test(visibleSearch)
      || (/(tablets$)/).test(visibleSearch)
      || (/(accessories$)/).test(visibleSearch)
      || (/(favorites$)/).test(visibleSearch))
        ? 'search'
        : 'search--none'
    }
    >
      <Paper
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: 327,
          height: 64,
          boxSizing: 'border-box',
          borderRadius: 0,
          borderBottom: '0px solid red',
          boxShadow: '-1px 0px 0px 0px #e2e6e9',
        }}
      >
        <InputBase
          sx={{
            ml: '24px',
            flex: 1,
            fontFamily: 'Mont-Regular, sans-serif',
            fontSize: '14px',
          }}
          placeholder={`Search in ${window.location.hash.replace(/(#\/)/, '')}`}
          className="search__input"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
        />
        <IconButton
          type="button"
          sx={{ p: '10px' }}
          aria-label="search"
          onClick={() => {
            setValue('');
            dispatch(setQuery(''));
          }}
        >
          <div className={value.length === 0
            ? 'search__lupa'
            : 'search__cross'}
          />
        </IconButton>
      </Paper>
    </div>
  );
};
