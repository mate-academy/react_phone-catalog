import React, { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';
import { useTheme } from '@/context/ThemeContext';

// Типізація пропсів
// Ми розширюємо стандартні атрибути кнопки (onClick, type, disabled тощо)
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'outline'; // Типи вигляду
  size?: 'small' | 'normal' | 'large'; // Розміри
  fullWidth?: boolean; // Чи розтягувати на всю ширину
  className?: string; // Для додавання зовнішніх відступів (margin)
}

export const Button: React.FC<Props> = ({
  children,
  variant = 'primary',
  size = 'normal',
  fullWidth = false,
  className,
  ...rest // Всі інші пропси (onClick, type="submit" і т.д.)
}) => {
  const { theme } = useTheme();
  console.log(theme);

  const buttonClass = classNames(
    styles.button,
    styles[`button--${variant}`], // наприклад: button--primary
    styles[`button--${size}`], // наприклад: button--normal
    // наприклад: button--normal
    {
      [styles['button--fullWidth']]: fullWidth,
      [styles['button--dark']]: theme === 'dark',
      [styles['button--outline--dark']]: theme === 'dark',
    },
    className, // Додаємо клас, який прийшов з батьківського компонента
  );

  return (
    <button className={buttonClass} {...rest}>
      {children}
    </button>
  );
};
