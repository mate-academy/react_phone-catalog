import React from 'react';
import './Icon.scss';
import { paths } from './IconsMap';
import classNames from 'classnames';

type IconsMap = keyof typeof paths;

type Props = {
  className: string;
  name: IconsMap;
  disabled?: boolean;
};

export const Icon: React.FC<Props> = ({
  className,
  name,
  disabled = false,
}) => {
  const path = paths[name];

  return (
    <svg
      viewBox="0 0 16 16"
      className={classNames(`icon ${className}`, {
        'icon--disabled': disabled,
      })}
    >
      {Array.isArray(path) &&
        path.map((d, i) =>
          typeof d === 'string' ? (
            <path fill="currentColor" d={d} key={i} />
          ) : (
            <path fill="currentColor" {...d} key={i} />
          ),
        )}
      {typeof path === 'string' && (
        <path d={paths[name] as string} fill="currentColor" />
      )}
    </svg>
  );
};
