import React from 'react';

type IconHomeProps = React.SVGProps<SVGSVGElement>;

export const IconHome: React.FC<IconHomeProps> = ({
  width = 16,
  height = 16,
  ...props
}) => (
  <svg width={width} height={height} viewBox="0 0 16 16" fill="none" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.59.807a.67.67 0 0 1 .82 0l6 4.667c.162.126.257.32.257.526v7.333a2 2 0 0 1-2 2H3.333a2 2 0 0 1-2-2V6c0-.206.095-.4.258-.526zm-4.923 5.52v7.006a.667.667 0 0 0 .666.667h9.334a.666.666 0 0 0 .666-.667V6.326L8 2.178z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.333 8c0-.368.299-.667.667-.667h4c.368 0 .667.299.667.667v6.667a.667.667 0 0 1-1.334 0v-6H6.667v6a.667.667 0 0 1-1.334 0z"
      fill="currentColor"
    />
  </svg>
);
