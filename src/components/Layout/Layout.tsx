import { FC } from 'react';
import { Footer } from '../Footer';
import { Header } from '../Header';
import './layout.scss';

interface Props {
  setIsMenuClicked: (isMenuButtonClicked: boolean) => void;
}

export const Layout: FC<Props> = ({ setIsMenuClicked, children }) => {
  return (
    <>
      <Header setIsMenuClicked={setIsMenuClicked} />
      <main className="main">
        {children}
      </main>
      <Footer />
    </>
  );
};
