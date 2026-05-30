import BackButton from '../components/ui/BackButton';

const NotFoundPage = () => {
  return (
    <main className="flex flex-col gap-6 justify-center">
      <BackButton />
      <h1 className="text-xl font-bold text-center">Page not found</h1>
      <div className="flex self-center items-center">
        <img src="/img/page-not-found.png" alt="not found page" />
      </div>
    </main>
  );
};

export default NotFoundPage;
