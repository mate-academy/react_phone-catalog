import { Icon } from '../../types/Icon';

export const IconRight: React.FC<Icon> = ({ fill, className }) => {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.52864 3.52864C5.78899
        3.26829 6.2111 3.26829 6.47145
        3.52864L10.4714 7.52864C10.7318 7.78899
         10.7318 8.2111 10.4714 8.47145L6.47145
          12.4714C6.2111 12.7318 5.78899 12.7318
          5.52864 12.4714C5.26829 12.2111 5.26829
          11.789 5.52864 11.5286L9.05723 8.00004L5.52864
          4.47145C5.26829 4.2111 5.26829 3.78899 5.52864 3.52864Z"
        fill={fill}
      />
    </svg>
  );
};
