import React, { useEffect, useRef, useState } from 'react';
import styles from './SettingsMenu.module.scss';
import classNames from 'classnames';
import { createPortal } from 'react-dom';
import { Button } from '../../../../../../atoms/Button';
import { Icon } from '../../../../../../atoms/Icon';
import { GearIcon } from '../../../../../../../../assets/icons/gear-icon';

type Props = {
  className?: string;
  children: React.ReactNode;
};

export const SettingsMenu: React.FC<Props> = ({ className, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [popupStyles, setPopupStyles] = useState<React.CSSProperties>({});

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        !document
          .getElementById('settings-popup')
          ?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const updatePopupPosition = () => {
      if (isOpen && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setPopupStyles({
          top: rect.bottom + 5,
          left: rect.left,
        });
      }
    };

    updatePopupPosition();

    window.addEventListener('resize', updatePopupPosition);
    return () => window.removeEventListener('resize', updatePopupPosition);
  }, [isOpen]);

  return (
    <>
      <Button
        ref={buttonRef}
        fullHeight
        className={classNames(styles.icon, isOpen && [styles['icon--active']])}
        onClick={() => setIsOpen(prev => !prev)}
        isSquare
      >
        <Icon>
          <GearIcon />
        </Icon>
      </Button>

      {isOpen &&
        createPortal(
          <div
            id="settings-popup"
            className={classNames(styles.settingsmenu, className)}
            style={popupStyles}
          >
            {children}
          </div>,
          document.body,
        )}
    </>
  );
};
