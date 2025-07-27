interface IconProps {
  width: string;
  height: string;
  color: string;
}

export const FacebookIcon = ({ width, height, color }: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 15.5 15.4062"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs />
      <path
        d="M15.5 7.75C15.5 11.625 12.6562 14.8438 8.9375 15.4062L8.9375 10L10.75 10L11.0938 7.75L8.9375 7.75L8.9375 6.3125C8.9375 5.6875 9.25 5.09375 10.2188 5.09375L11.1875 5.09375L11.1875 3.1875C11.1875 3.1875 10.3125 3.03125 9.4375 3.03125C7.6875 3.03125 6.53125 4.125 6.53125 6.0625L6.53125 7.75L4.5625 7.75L4.5625 10L6.53125 10L6.53125 15.4062C2.8125 14.8438 0 11.625 0 7.75C0 3.46875 3.46875 0 7.75 0C12.0312 0 15.5 3.46875 15.5 7.75Z"
        fill="#707070"
        fillOpacity="1.000000"
        fillRule="evenodd"
      />
    </svg>
  );
};
