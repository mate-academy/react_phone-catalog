import s from './Button.module.scss';

// make import svg as react component

type Props = {
  iconName: string;
  className?: string; // Optional className property
};

const ICON_PATH = '../../icons/';

export const Button: React.FC<Props> = ({ iconName, className }) => {
  return (
    <a href="#" className={`${s.button} ${className || ''}`}>
      <img
        className={s.button__icon}
        src={ICON_PATH + iconName + '.svg'}
        alt={iconName}
      />
    </a>
  );
};
