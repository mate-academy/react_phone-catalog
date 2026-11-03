import { useEffect, useRef, useState } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const SELECTED_DURATION_MS = 1000;

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> & {
  onClick: () => void;
  textAfterClick?: string;
};

export const Button = ({
  onClick,
  textAfterClick,
  children,
  ...rest
}: ButtonProps) => {
  const [selected, setSelected] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleOnClick = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setSelected(true);
    onClick();

    timeoutRef.current = setTimeout(() => {
      setSelected(false);
      timeoutRef.current = null;
    }, SELECTED_DURATION_MS);
  };

  return (
    <button
      {...rest}
      className={cx('button', { 'button--selected': selected })}
      aria-pressed={selected}
      onClick={handleOnClick}
    >
      {selected && textAfterClick ? textAfterClick : children}
    </button>
  );
};
