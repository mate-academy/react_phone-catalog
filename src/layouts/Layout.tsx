import Footer from './Footer/Footer';
import { Header } from './Header/Header';
import './Layout.scss';
type Props = {
  children: React.ReactNode;
};
export function Layout({ children }: Props) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
