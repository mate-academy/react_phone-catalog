type Props = {
  variant?: 'right' | 'top' | 'bottom' | 'left';
};

export const VECTOR_SVG: React.FC<Props> = ({ variant = 'right' }) => {
  const variantTrasform = () => {
    switch (variant) {
      case 'right': {
        return { transform: `rotate(0deg)` };
      }

      case 'top': {
        return { transform: `rotate(-90deg)` };
      }

      case 'bottom': {
        return { transform: `rotate(90deg)` };
      }

      case 'left': {
        return { transform: `rotate(180deg)` };
      }
    }
  };

  return (
    <svg
      width="6"
      height="10"
      viewBox="0 0 6 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={variantTrasform()}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="
          M0.528758 0.528606
          C0.789108 0.268256 1.21122 0.268256 1.47157 0.528606
          L5.47157 4.52861
          C5.73192 4.78896 5.73192 5.21107 5.47157 5.47141
          L1.47157 9.47141
          C1.21122 9.73176 0.789108 9.73176 0.528758 9.47141
          C0.268409 9.21107 0.268409 8.78896 0.528758 8.52861
          L4.05735 5.00001
          L0.528758 1.47141
          C0.268409 1.21107 0.268409 0.788955 0.528758 0.528606Z"
        fill="#313237"
      />
    </svg>
  );
};
