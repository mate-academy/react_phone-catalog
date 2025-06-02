import style from './TitlePages.module.scss';
type Props = {
  type:
  | 'notFound'
  | 'home'
  | 'favourites'
  | 'cart'
  | 'phones'
  | 'accessories'
  | 'tablets';
};

export const TitlePages = (props: Props) => {
  const { type } = props;

  return (
    <div className={style.title}>
      {type === 'home' && (
        <h1 className={style.title__text}>Welcome to Nice Gadgets store!</h1>
      )}
      {type === 'phones' && (
        <h1 className={style.title__text}>Mobile phones</h1>
      )}
      {type === 'notFound' && (
        <h1 className={style.title__text}>Page not found!</h1>
      )}
       {type === 'accessories' && (
        <h1 className={style.title__text}>Accessories</h1>
      )}
       {type === 'tablets' && (
        <h1 className={style.title__text}>Tablets</h1>
      )}
    </div>
  );
};
