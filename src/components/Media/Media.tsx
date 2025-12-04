import s from './Media.module.scss';

type Props = {
  images: string[];
  setMainPhoto: (value: string) => void;
};

export const Media: React.FC<Props> = ({ images, setMainPhoto }) => {
  return (
    <div className={s.media}>
      <ol className={s.media__list}>

        {images.map((img, index)=>{
          return (
            <li
              key={index}
              className={s.media__item}
              onClick={()=> setMainPhoto(`${img}`)}
            >
              <img className={s['media__list-img']} src={`/${img}`} alt={img} />
            </li>
          )
        })}
      </ol>
    </div>
  );
};
