import { Banner } from '../components/Banner';

export const HomePage = () => {
  return (
    <main className="content w-full pt-6 md:pt-8 lg:pt-14">
      <div className="flex flex-col gap-6 md:gap-8 lg:gap-14">
        <h1 className="padding-inline-sm md:px-0">
          Welcome to Nice Gadgets store!
        </h1>

        <Banner />
      </div>
    </main>
  );
};
