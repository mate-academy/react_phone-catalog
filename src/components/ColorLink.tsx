import { Link, LinkProps } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

interface Props extends LinkProps {
  color: string;
  active: boolean;
}

export const ColorLink: React.FC<Props> = ({ color, active, ...rest }) => (
  <Link
    className={twMerge(
      `h-8 w-8 rounded-full border border-icons
     bg-white p-0.5 hover:border-primary
    `,
      active && 'border-primary',
    )}
    {...rest}
  >
    <div
      className={`h-full w-full rounded-full bg-contain`}
      style={{ backgroundColor: color }}
    />
  </Link>
);
