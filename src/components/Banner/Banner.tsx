import { NavLink } from 'react-router-dom';
import s from './Banner.module.scss';

type Props = {
  title: string;
  subTitle: string;
  imgUrl: string;
  url: string;
  imgTitle: string;
};

export const Banner: React.FC<Props> = ({
  title,
  subTitle,
  imgUrl,
  url,
  imgTitle,
}) => {
  return (
    <div className={s.banner}>
      <div className={s.banner__action}>
        <div className={s.banner__context}>
          <h1 className={s.banner__title}>{title}</h1>
          <p className={s['banner__sub-title']}>{subTitle}</p>
        </div>

        <NavLink to={url} className={s.banner__url}>
          <button className={s.banner__button}>Order now</button>
        </NavLink>
      </div>

      <div className={s.banner__media}>
        <img className={s.banner__img} src={imgUrl} alt={imgTitle} />
      </div>
    </div>
  );
};
