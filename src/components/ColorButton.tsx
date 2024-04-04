import { twMerge } from 'tailwind-merge';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  active?: boolean;
  color: string;
}

export const ColorButton: React.FC<Props> = ({
  className = '',
  active = false,
  color,
  ...rest
}) => {
  return (
    <button
      className={twMerge(
        `aspect-square h-8 overflow-hidden rounded-full
        border border-elements p-[0.125rem] hover:border-icons`,
        className,
        active && 'pointer-events-none border-primary',
      )}
      {...rest}
    >
      <div
        className="h-full w-full rounded-full"
        style={{ backgroundColor: color }}
      ></div>
    </button>
  );
};
