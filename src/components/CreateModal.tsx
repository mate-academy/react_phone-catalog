import React from 'react';
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';

interface Props {
  children: React.ReactNode;
  className?: string;
  media?: {
    onPhone?: boolean;
    onTablet?: boolean;
    onDesktop?: boolean;
  };
}

export const CreateModal: React.FC<Props> = ({ children, className = '' }) => {
  return createPortal(
    <div
      className={twMerge(
        `fixed inset-0 z-50 overflow-auto backdrop-blur-md
        [&>*]:absolute [&>*]:left-1/2 [&>*]:top-1/2
        [&>*]:h-fit [&>*]:translate-x-[max(-50%,-50vw)] [&>*]:translate-y-[max(-50%,-50vh)]
        [&>*]:shadow-[-1px_4px_15px_0_rgba(0,0,0,0.25)]`,
        className,
      )}
    >
      {children}
    </div>,
    document.body,
  );
};
