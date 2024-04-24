import React from 'react';
import closeIcon from '../images/icons/close-disable.svg';

interface Props {
  className?: string;
  icon?: string;
  title?: string;
  description?: string;
  onClose?: (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
}

export const NotificationMessage: React.FC<Props> = ({
  className = '',
  icon,
  title = '',
  description = '',
  onClose = () => {},
}) => {
  return (
    <article
      className={`flex w-full items-start gap-5
      border border-primary bg-white p-4 md:w-[467px] md:p-6
      ${className}`}
    >
      <div className="flex flex-1 items-center gap-2">
        {icon && <img src={icon} alt="Devices" className="h-8 w-8" />}
        <div>
          {title && <p>{title}</p>}
          {description && <small className="text-icons">{description}</small>}
        </div>
      </div>
      <img
        src={closeIcon}
        alt="close"
        className="cursor-pointer"
        onClick={onClose}
      />
    </article>
  );
};
