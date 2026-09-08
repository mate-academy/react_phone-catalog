import s from './Navigation.module.scss';

type Props = {
  address: string;
};

export const Navigation: React.FC<Props> = ({ address }) => {
  return (
    <>
      <div className={s.NavigationField}>
        <a href="" className={s.NavigationLink}></a>
        <div className={s.Arrow} />
        <p className={s.CurrentPage}>
          {address[0].toUpperCase() + address.slice(1)}
        </p>
      </div>
    </>
  );
};
