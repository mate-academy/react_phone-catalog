import style from './Footer.module.scss';

export const Footer = () => {
  const navigation = ['GITHUB', 'CONTACTS', 'RIGHTS'];
  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={style.footer}>
      <div className={style.logo}>
        <img className={style.logo__image} src="./logo/Logo.png" />
      </div>
      <div className={style.navigation}>
        <ul className={style.navigation__list}>
          {navigation.map(item => (
            <li key={item}>
              <a
                href="https://github.com/yzhyhaliuk/react_phone-catalog"
                target="_blank"
                rel="noopener noreferrer"
                className={style.navigation__link}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className={style.return}>
        <span className={style.return__words}>Back to top</span>
        <button className={style.return__arrow} onClick={scrollUp}>
          <img src="./icons/arrow-up.png" alt="Up" />
        </button>
      </div>
    </div>
  );
};
