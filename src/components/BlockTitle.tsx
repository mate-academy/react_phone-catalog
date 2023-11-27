import { memo } from 'react';

type Props = {
  title: string | undefined,
  subtitle:number,
};

export const BlockTitle:React.FC<Props> = memo(({ subtitle, title }) => {
  return (
    <div className="title">
      <h1 className="title__title">{title}</h1>
      {(subtitle > 0 || title === 'Favourites') && (
        <div className="title__subtitle">
          {`${subtitle} items`}
        </div>
      )}
    </div>
  );
});
