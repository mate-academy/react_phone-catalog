import { useNavigate } from 'react-router-dom';
import styles from './BackButton.module.scss';
import ArrowLeft from '../../../../public/icons/chevron-arrow-left.svg?react';
import { ButtonHTMLAttributes } from 'react';
import cn from 'classnames';

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export const BackButton = ({ className, ...props }: Props) => {
  const navigate = useNavigate();

  return (
    <button
      className={cn(styles.backButton, className)}
      onClick={() => {
        navigate(-1);
      }}
      {...props}
    >
      <ArrowLeft />
      Back
    </button>
  );
};
