import { useLocation } from "react-router-dom";
import s from './Breadcrumps.module.scss';
import { Section } from "@/atoms";
import Chevron from '@/assets/icons/chevron.svg?react';
import Home from '@/assets/icons/home.svg?react';

const Breadcrumps = () => {
  const location = useLocation();
  const path = location.pathname.split('/').filter(Boolean);

  return (
    <Section className={s.section}>
      <div className={s.path}>
        <Home className={s.path__home} />
        <Chevron className={s.path__chevron} />
        <ul className={s.base}>
          {path.map((p, index) =>
            <div className={s.path}>
              <li>{p}</li>
              {index === path.length && <Chevron className={s.path__chevron} />}
            </div>
          )}
        </ul>
      </div>
    </Section>
  )
}

export default Breadcrumps;
