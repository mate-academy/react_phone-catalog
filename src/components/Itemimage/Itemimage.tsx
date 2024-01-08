import { Link } from 'react-router-dom';

type Props = {
  src: string;
  mainImage: string;
  setImg: (arg: string) => void;
};
export const Itemimage: React.FC<Props> = ({ mainImage, src, setImg }) => {
  return (
    <Link
      to="."
      className={`minitemimage h-20 w-20 border ${mainImage === src ? 'border-primary' : 'border-secondary'}`}
      onClick={(e) => {
        e.preventDefault();
        setImg(src);
      }}
    >
      <img src={src} alt="str" />
    </Link>
  );
};
