import React, { useId } from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  title?: string | null;
  viewBox?: string;
  children?: React.ReactNode;
}

export const Icon: React.FC<IconProps> = React.memo(function Icon({
  size = 16,
  title = null,
  viewBox = '0 0 20 20',
  className,
  children,
  ...rest
}) {
  const id = useId();
  const titleId = title ? `icon-title-${id}` : undefined;
  const sizeAttr = typeof size === 'number' ? `${size}` : size;

  const ariaAttrs = title
    ? { role: 'img', 'aria-labelledby': titleId }
    : { 'aria-hidden': true as const };

  return (
    <svg
      className={className}
      width={sizeAttr}
      height={sizeAttr}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...ariaAttrs}
      {...rest}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      {children}
    </svg>
  );
});

export default Icon;
