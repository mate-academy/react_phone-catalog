type Props = {
  items: number;
};

export const IconNumber: React.FC<Props> = ({ items }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="7" cy="7" r="6.5" fill="#EB5757" stroke="white" />
    <text
      x="7"
      y="9"
      textAnchor="middle"
      fill="white"
      fontSize="7"
      fontFamily="Mont"
      fontWeight="600"
    >
      {items}
    </text>
    ;
  </svg>
);

export default IconNumber;
