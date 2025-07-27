export type ArrowRightButtonProps = {
  isDisabled?: boolean;
};

export const ArrowRightButton = ({ isDisabled }: ArrowRightButtonProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
  >
    <path
      className={
        isDisabled
          ? 'stroke-arrow-border-disabled dark:stroke-dark-arrow-border-disabled'
          : 'group-hover:stroke-secondary dark:group-hover:stroke-purple stroke-arrow-border-active dark:stroke-dark-arrow-border-active'
      }
      d="M.5.5h31v31H.5z"
    />
    <path
      className={
        isDisabled
          ? 'fill-arrow-disabled dark:fill-dark-arrow-disabled'
          : 'fill-arrow-active dark:fill-dark-arrow-active'
      }
      fillRule="evenodd"
      d="M13.529 11.529c.26-.26.682-.26.943 0l4 4c.26.26.26.682 0 .942l-4 4a.667.667 0 1 1-.943-.942L17.057 16l-3.528-3.529a.667.667 0 0 1 0-.942Z"
      clipRule="evenodd"
    />
  </svg>
);
