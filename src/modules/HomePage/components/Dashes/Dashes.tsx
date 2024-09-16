import classNames from 'classnames';
import { Dash } from '../Dash/Dash';
import styles from './Dashes.module.scss';

type HandleClick = (newPosition: number) => void;

type Props = {
  amount: number;
  position: number;
  onClick: HandleClick;
  className?: string;
};

export const Dashes: React.FC<Props> = ({
  amount,
  position,
  onClick,
  className,
}) => {
  const dashes: React.JSX.Element[] = [];

  for (let i = 0; i < amount; i++) {
    dashes.push(
      <Dash
        key={i}
        label={i + 1}
        position={i}
        activePosition={position}
        onClick={() => onClick(i)}
      />,
    );
  }

  return <ul className={classNames(styles.Dashes, className)}>{dashes}</ul>;
};
