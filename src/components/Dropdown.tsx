import { useSearchParams } from 'react-router-dom';
import cn from 'clsx';
import type { ChangeEvent, FC } from 'react';

type DropdownProps = {
  description: string;
  options: { [key: string]: string };
  searchParam: 'sort' | 'perPage';
  defaultValue: string;
  className?: string;
};

export const Dropdown: FC<DropdownProps> = ({
  description,
  options,
  searchParam,
  defaultValue,
  className,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedOption = searchParams.get(searchParam) || defaultValue;

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;

    const newParams = new URLSearchParams(searchParams);

    newParams.set(searchParam, newValue);

    if (newParams.has('page')) {
      newParams.set('page', '1');
    }

    setSearchParams(newParams);
  };

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <label htmlFor={description} className="text-small text-secondary">
        {description}
      </label>

      <select
        id={description}
        value={selectedOption}
        onChange={handleChange}
        className="h-10 px-3 border border-elements bg-white text-buttons cursor-pointer focus:border-primary outline-none"
      >
        {Object.keys(options).map(key => (
          <option key={key} value={options[key]}>
            {key}
          </option>
        ))}
      </select>
    </div>
  );
};
