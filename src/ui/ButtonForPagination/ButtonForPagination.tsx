import './ButtonForPagination.scss';
import cn from 'classnames';

interface ButtonForPaginationProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  number: number;
  selected?: boolean;
}

export const ButtonForPagination: React.FC<ButtonForPaginationProps> = ({
  number,
  selected = false,
  className,
  ...props
}) => {
  const buttonClass = cn('pagination-btn', className, {
    'pagination-btn--selected': selected,
  });

  return (
    <button
      className={buttonClass}
      {...props}
    >
      {number}
    </button>
  );
};
