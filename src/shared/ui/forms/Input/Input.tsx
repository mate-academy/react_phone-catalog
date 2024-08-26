import { ChangeEvent, FC } from 'react';
import { FormItem } from '../FormItem/FormItem';

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
      <input value={search} onChange={onChange} />
    </FormItem>
  );
};
