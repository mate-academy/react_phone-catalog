import { Link, useNavigate } from 'react-router-dom';
import HomeIcon from '../../../assets/Home.svg';
import ArrowIcon from '../../../assets/Chevron (Arrow Right).png';
import ArrowBack from '../../../assets/Chevron (Arrow Left).svg';
import s from './Breadcrumbs.module.scss';

type Crumb = { label: string; to?: string };

type Props = {
  trail: Crumb[];
  variant?: 'home' | 'back';
};

export const Breadcrumbs: React.FC<Props> = ({ trail, variant = 'home' }) => {
  const navigate = useNavigate();

  return (
    <nav aria-label="Breadcrumb" className={s.breadcrumbs}>
      {variant === 'home' ? (
        <Link to="/" className={s.link} aria-label="Home">
          <img src={HomeIcon} alt="" className={s.homeIcon} />
        </Link>
      ) : (
        <button
          type="button"
          className={s.backBtn}
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <img src={ArrowBack} alt="" className={s.backIcon} />
          <span className={s.backText}>Back</span>
        </button>
      )}

      {trail.map((crumb, i) => {
        const isLast = i === trail.length - 1;

        return (
          <span key={i} className={s.segment}>
            <img src={ArrowIcon} alt="" className={s.arrowIcon} />
            {isLast || !crumb.to ? (
              <span className={s.current}>{crumb.label}</span>
            ) : (
              <Link to={crumb.to} className={s.link}>
                {crumb.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};
