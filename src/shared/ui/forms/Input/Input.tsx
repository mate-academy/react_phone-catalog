import { ChangeEvent, FC } from 'react';
import classNames from 'classnames';
import { FormItem } from '../FormItem/FormItem';
import common from '../styles/common.module.scss';
import icons from '../../../styles/icons.module.scss';
import cls from './input.module.scss';

interface Props {
  className?: string;
  label?: string;
  search: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input: FC<Props> = props => {
  const { label, search, onChange, className } = props;

  return (
    <FormItem className={className} label={label}>
      <div
        className={classNames(
          common.wrapper,
          cls.wrapper,
          icons['_icon-search'],
        )}
      >
        <input value={search} onChange={onChange} className={cls.input} />
      </div>
    </FormItem>
  );
};
