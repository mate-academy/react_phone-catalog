import style from './IconMenu.module.scss';

type Props = {
  isOpen: boolean;
};

export const IconMenu: React.FC<Props> = ({ isOpen }) => {
  return (
    <div className={style.iconWrapper}>
      <span className={isOpen ? style.line1 : style.lineTop}></span>
      <span className={isOpen ? style.line2 : style.lineMidle}></span>
      <span className={isOpen ? style.line3 : style.lineBottom}></span>
    </div>
  );
};
