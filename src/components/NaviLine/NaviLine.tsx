import './NaviLine.scss';

type Props = {
  link: string;
}

export const NaviLine: React.FC<Props> = ({ link }) => {
  return (
    <div className="navi__line">
      <a href="#" className="navi__icon">
        <span></span>
      </a>
      <span className="navi__arrow" />
      <a href="#" className="navi__item">
        <span>{link}</span>
      </a>
    </div>
  )
}
