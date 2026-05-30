import classNames from 'classnames';
import scss from './Line.module.scss';

interface Props {
  className?: string;
}

export const Line: React.FC<Props> = ({ className }) => {
  return <hr className={classNames(scss.line, className)}></hr>;
};
