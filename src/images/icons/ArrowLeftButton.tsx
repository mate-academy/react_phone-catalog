export type ArrowLeftButtonProps = {
  isDisabled?: boolean;
};

export const ArrowLeftButton = ({ isDisabled }: ArrowLeftButtonProps) => (
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
      d="M18.471 11.529a.667.667 0 0 0-.943 0l-4 4a.667.667 0 0 0 0 .942l4 4a.667.667 0 1 0 .943-.942L14.943 16l3.528-3.529a.667.667 0 0 0 0-.942Z"
      clipRule="evenodd"
    />
  </svg>
);
