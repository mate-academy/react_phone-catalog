import { ChangeEvent, useMemo } from 'react';
import cls from './select.module.scss';
import classNames from 'classnames';

export interface SelectOption<T> {
  value: T;
  content: string;
}

interface Props<T extends string> {
  className?: string;
  label: string;
  options: SelectOption<T>[];
  value: T;
  onChange?: (value: T) => void;
}

export const Select = <T extends string>(props: Props<T>) => {
  const { className, label, value, options, onChange } = props;

  const optionsList = useMemo(() => {
    return options?.map(opt => (
      <option className={cls.option} key={opt.value} value={opt.value}>
        {opt.content}
      </option>
    ));
  }, [options]);

  const onchangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value as T);
  };

  return (
    <div className={classNames(cls.select, className)}>
      {label && <span>{label}</span>}
      <select className={cls.select} value={value} onChange={onchangeHandler}>
        {optionsList}
      </select>
    </div>
  );
};
