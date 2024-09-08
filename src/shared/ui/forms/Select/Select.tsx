import { useMemo, useState } from 'react';
import classNames from 'classnames';
import { capitalizeFirstLetter } from '../../../lib/utils/capitalizeFirstLetter';
import { FormItem } from '../FormItem/FormItem';
import icons from '../../../styles/icons.module.scss';
import common from '../styles/common.module.scss';
import cls from './select.module.scss';

export interface ICustopmSelectOption<T> {
  value: T;
  label: string;
}

interface Props<T> {
  className?: string;
  label?: string;
  value: T;
  options: ICustopmSelectOption<T>[];
  onChange?: (value: T) => void;
  formElementId?: string;
}

export const CustopmSelect = <T extends string>(props: Props<T>) => {
  const { value, options, onChange, label, formElementId, className } = props;
  const [isActive, setIsActive] = useState<boolean>(false);

  const optionsList = useMemo(
    () =>
      options.map(({ value: selectValue, label: selectLabel }) => {
        return (
          <button
            onClick={() => onChange?.(selectValue as T)}
            key={selectValue}
            className={classNames(cls.option, {
              [cls.isActive]: value === selectValue,
            })}
          >
            {selectLabel}
          </button>
        );
      }),
    [onChange, options, value],
  );

  return (
    <FormItem
      className={classNames(className, cls.select, {
        [cls.isActive]: isActive,
      })}
      label={label}
      formElementId={formElementId}
    >
      <button
        id={formElementId}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        className={classNames(
          common.wrapper,
          cls.trigger,
          icons['_icon-arrow'],
        )}
      >
        {capitalizeFirstLetter(value)}
      </button>

      <div className={classNames(cls.popup)}>{optionsList}</div>
    </FormItem>
  );
};
