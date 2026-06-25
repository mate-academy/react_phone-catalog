type IconProps = {
  className?: string;
};

export const HeartIcon = ({
  className,
  filled = false,
}: IconProps & { filled?: boolean }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 20 20"
    fill={filled ? 'currentColor' : 'none'}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 17.2s-7-4.4-7-9.4A4 4 0 0 1 10 5a4 4 0 0 1 7 2.8c0 5-7 9.4-7 9.4Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CartIcon = ({ className }: IconProps) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.5 6.5V5a3 3 0 1 1 6 0v1.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d={`M2.5 5h2l.7 9.2a1.5 1.5 0 0 0 1.5 1.4h7.6a1.5 1.5 0 0 0
        1.5-1.4L17 6.5H5.6`}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="8" cy="17.5" r="1" fill="currentColor" />
    <circle cx="14" cy="17.5" r="1" fill="currentColor" />
  </svg>
);

export const ChevronLeftIcon = ({ className }: IconProps) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 3 5 8l5 5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ChevronRightIcon = ({ className }: IconProps) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 3l5 5-5 5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ArrowUpIcon = ({ className }: IconProps) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 13V3m-4.5 4.5L8 3l4.5 4.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const MenuIcon = ({ className }: IconProps) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 6h14M3 10h14M3 14h14"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export const SearchIcon = ({ className }: IconProps) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M15.5 15.5 12 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export const CloseIcon = ({ className }: IconProps) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 5l10 10M15 5 5 15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);
