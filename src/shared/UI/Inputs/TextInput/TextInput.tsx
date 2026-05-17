import React from 'react';
import styles from './TextInput.module.scss';
import cn from 'classnames';

interface TextInputProps {
  value: string;
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (value: React.ChangeEvent<HTMLInputElement>) => void;
  type: 'text' | 'email' | 'password';
  placeholder?: string;
  autoFocus?: boolean;
  name?: string;
  required?: boolean;
  valid?: boolean;
  classNames?: string;
}

export const TextInput: React.FC<TextInputProps> = ({
  onChange,
  valid,
  classNames,
  ...props
}) => {
  return (
    <input
      onChange={e => onChange(e)}
      className={cn(styles.input, classNames, { [styles.error]: valid })}
      {...props}
    />
  );
};
