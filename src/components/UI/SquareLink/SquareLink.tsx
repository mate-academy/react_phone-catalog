import React, { memo, useCallback } from 'react';
import { Link, LinkProps, NavLink } from 'react-router-dom';
import './SquareLink.scss';

interface Props extends LinkProps {
  iconName: string;
  iconFormat?: string,
  amount?: number,
  nav?: boolean,
  isActive?: boolean,
}

export const SquareLink: React.FC<Props> = memo(({
  iconName,
  iconFormat = 'svg',
  className = '',
  amount,
  nav,
  isActive,
  ...restProps
}) => {
  const classes = `square-link ${className}`;

  const Image = useCallback(() => (
    <div className='square-link__img-container'>
      <img
        className='square-link__img'
        src={`./img/icons/${iconName}.${iconFormat}`}
        alt="Icon"
      />

      {(amount ?? 0) > 0 && (
        <div className='square-link__amount'>
          {amount}
        </div>
      )}
    </div>
  ), [iconName, iconFormat, amount]);

  const setClasses = useCallback(({ isActive }: { isActive: boolean }) => {
    return `${classes} ${isActive ? 'square-link--selected' : ''}`;
  }, [classes]);

  if (nav) {
    return <NavLink className={setClasses} children={<Image />} {...restProps} />;
  }

  return (
    <Link
      className={`${classes} ${isActive ? 'square-link--selected' : ''}`}
      children={<Image />}
      {...restProps}
    />
  );
});
