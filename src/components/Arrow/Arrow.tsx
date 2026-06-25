import { type ArrowDirectionType, IconArrow } from '../../shared/IconArrow';
import classNames from 'classnames';
import arrowStyles from './Arrow.module.scss';

type Props = {
  direction: ArrowDirectionType;
  disabled?: boolean;
};

export const Arrow = ({ direction, disabled = false }: Props) => {
  return (
    <div
      className={classNames(arrowStyles.Arrow, {
        [arrowStyles.ArrowDisabled]: disabled,
      })}
    >
      <IconArrow direction={direction} />
    </div>
  );
};
