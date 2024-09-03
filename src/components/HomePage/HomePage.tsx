import { Header } from './Header/header';
import { HomeFace } from './Welcome/HomeFace';

export const HomePage = () => {
  return (
    <>
      <header>
        <Header />
      </header>

      <main>
        <HomeFace />
      </main>
    </>
  );
};
