import { useTranslate } from '../../hooks/useTranslate';
import { SpecItem } from '../../types/SpecItem';
import style from './SpecsList.module.scss';

type Props = {
  specs: SpecItem[];
  fontSize: number;
};

export const SpecsList: React.FC<Props> = ({ specs, fontSize }) => {
  const t = useTranslate();

  return (
    <div className={style.specsContent}>
      {specs.map(({ label, value }) => {
        if (!value) {
          return;
        }

        return (
          <div className={style.specs} key={label}>
            <div
              className={style.name}
              style={{ '--font-size': `${fontSize}px` } as React.CSSProperties}
            >
              {t(label)}
            </div>
            <div
              className={style.value}
              style={{ '--font-size': `${fontSize}px` } as React.CSSProperties}
            >
              {Array.isArray(value) ? value.join(', ') : value}
            </div>
          </div>
        );
      })}
    </div>
  );
};
