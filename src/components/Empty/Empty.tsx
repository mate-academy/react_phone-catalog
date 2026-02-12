import s from './Empty.module.scss';

type Props = {
  message: string;
  img: string;
};

export const Empty: React.FC<Props> = ({ message, img }) => {
  return (
    <div className={s.empty}>
      <h2 className={s.empty__title}>{message}</h2>

      <img
        src={`img/empty_${img}.png`}
        alt="icon_pic"
        className={s.empty__img}
      />
    </div>
  );
};
