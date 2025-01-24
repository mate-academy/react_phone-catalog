import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setLanguage } from '../../../features/globalSlice';
import cl from './LanguageSelector.module.scss';
import cn from 'classnames';

type Props = {
  className?: string;
};

export const LanguageSelector: React.FC<Props> = ({ className }) => {
  const dispatch = useAppDispatch();
  const { language } = useAppSelector(st => st.global);

  return (
    <section className={`${cl.wrapper} ${className}`}>
      <p className={cl.wrapper__text}>
        <span>Select preferred languade</span> <span>Оберіть бажану мову</span>
      </p>
      <div className={cl.wrapper__buttons}>
        <button
          className={cn(cl.wrapper__button, {
            [cl.wrapper__buttonActive]: language === 'en',
          })}
          onClick={() => dispatch(setLanguage('en'))}
        >
          EN
        </button>
        <button
          className={cn(cl.wrapper__button, {
            [cl.wrapper__buttonActive]: language === 'ua',
          })}
          onClick={() => dispatch(setLanguage('ua'))}
        >
          UA
        </button>
      </div>
    </section>
  );
};
