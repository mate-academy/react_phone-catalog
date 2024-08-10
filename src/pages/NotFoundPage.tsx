import notFoundPageImg from '../images/page-not-found.png';

export const NotFoundPage: React.FC = () => {
  return (
    <main
      className="flex h-full w-full items-center
      justify-center overflow-hidden"
    >
      <img src={notFoundPageImg} alt="404" />
    </main>
  );
};
