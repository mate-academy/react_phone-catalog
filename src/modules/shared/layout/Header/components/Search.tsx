import {
  ChangeEvent,
  FC,
  KeyboardEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'clsx';
import { useDebounce } from '../../../hooks/useDebounce';
import { Button } from '../../../components/ui/Button/Button';
import Close from '/src/images/icons/close.svg?react';
import SearchIcon from '/src/images/icons/search.svg?react';
import { useTranslations } from 'use-intl';

interface Props {
  className?: string;
}

export const Search: FC<Props> = ({ className }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('query') || '';

  const [inputValue, setInputValue] = useState(queryParam);
  const debouncedValue = useDebounce(inputValue, 1000);
  const t = useTranslations('search');

  // Sync local input with URL if it changes externally (e.g. from the other Search component)
  useEffect(() => {
    setInputValue(queryParam);
  }, [queryParam]);

  const applyQuery = useCallback(
    (value: string) => {
      setSearchParams(prevParams => {
        const currentQuery = prevParams.get('query') || '';

        if (value === currentQuery) {
          return prevParams;
        }

        const params = new URLSearchParams(prevParams);

        if (value) {
          params.set('query', value);
          params.delete('sort');
          params.delete('perPage');
          params.delete('page');
        } else {
          params.delete('query');
        }

        return params;
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    applyQuery(debouncedValue);
  }, [debouncedValue, applyQuery]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClear = () => {
    setInputValue('');
    applyQuery('');
  };

  const handleSearchSubmit = () => {
    applyQuery(inputValue);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      applyQuery(inputValue);
    }
  };

  return (
    <div className={cn('flex items-center', className)}>
      <span className="sr-only">{t('srLabel')}</span>
      <Button className="aspect-square p-4 xl:p-6" onClick={handleSearchSubmit}>
        <SearchIcon className="fill-primary dark:fill-d-white" />
      </Button>
      <input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={t('placeholder')}
        className="text-buttons text-primary dark:text-d-white flex h-full w-full cursor-text items-center justify-between px-3 outline-none"
      />
      {inputValue && (
        <Button className="aspect-square p-4 xl:p-6" onClick={handleClear}>
          <Close className="fill-primary dark:fill-d-white" />
        </Button>
      )}
    </div>
  );
};
