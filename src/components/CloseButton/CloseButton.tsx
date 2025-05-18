import React, { memo } from 'react';
import closeButtonStyles from './CloseButton.module.scss';
import { IconSvg } from '../IconSvg';
import { ICON_DATA_PATHS } from '../../constants/iconDataPaths';
import classNames from 'classnames';

type Props = {
  className?: string;
  onClose?: () => void;
};

export const CloseButton: React.FC<Props> = memo(
  ({ className, onClose = () => {} }) => {
    return (
      <button
        className={classNames(className, closeButtonStyles.closeButton)}
        onClick={onClose}
      >
        <IconSvg dataPath={ICON_DATA_PATHS.CLOSE} />
      </button>
    );
  },
);

CloseButton.displayName = 'CloseButton';
