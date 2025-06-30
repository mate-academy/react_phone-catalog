import { NavLink } from 'react-router-dom';
import style from './Footer.module.scss';
import { Directions, IconId } from '../../types/icons';
import { Button } from '../../shared/ui/Button';

export const Footer = () => {
  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={style.footer}>
      <div className={style.footerContent}>
        <NavLink className={style.link__item} to="/">
          <img src="./img/Logo.png" alt="logo" className={style.footerLogo} />
        </NavLink>

        <div className={style.footerList}>
          <NavLink
            className={style.link__item}
            to="https://github.com/Yaroslav65"
          >
            Github
          </NavLink>

          <NavLink className={style.link__item} to="/">
            Contacts
          </NavLink>

          <NavLink className={style.link__item} to="/">
            Rights
          </NavLink>
        </div>
        <div onClick={backToTop} className={style.buttonBack}>
          Back to top
          <Button
            iconId={IconId.Chevron}
            directions={Directions.Up}
            className={style.button}
          />
        </div>
      </div>
    </footer>
  );
};
