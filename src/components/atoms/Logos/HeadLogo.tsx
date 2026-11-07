import { Link } from 'react-router-dom';

type Props = {
  onClick: () => void;
};

export const HeadLogo: React.FC<Props> = ({ onClick }) => {
  return (
    <Link
      to="/"
      className="cursor-pointer w-16 h-5.5 lg:w-20 lg:h-7 block shrink-0"
      onClick={onClick}
    >
      <img
        src="/img/Logo.svg"
        alt="Nice Gadgets"
        className="w-full h-full object-contain dark:hidden"
      />
      <img
        src="/img/Logo-dark.svg"
        alt="Nice Gadgets"
        className="w-full h-full object-contain hidden dark:block"
      />
    </Link>
  );
};
