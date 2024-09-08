import { ChangeEvent, InputHTMLAttributes, memo } from 'react';
import cls from './radioButton.module.scss';
import classNames from 'classnames';

export enum RadioButtonTheme {
  ROUNDED = 'rounded',
  SQUARE = 'square',
}

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>;

interface Props extends HTMLInputProps {
  className?: string;
  value: string;
  color?: string;
  onChange: (color: string) => void;
  theme?: RadioButtonTheme;
  text?: string;
}

export const RadioButton = memo((props: Props) => {
  const {
    className,
    color,
    text,
    onChange,
    value,
    theme = RadioButtonTheme.ROUNDED,
    ...otherProps
  } = props;

  const onChangeHangler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const styles = color
    ? { backgroundColor: color !== 'midnight' ? color : '#2b333b' }
    : {};

  return (
    <div className={classNames(cls[theme], cls.radioButtonWrapper, className)}>
      <input
        type="radio"
        {...otherProps}
        value={value}
        onChange={onChangeHangler}
      />
      <div className={cls.radioButton} style={styles}>
        {text}
      </div>
    </div>
  );
});
