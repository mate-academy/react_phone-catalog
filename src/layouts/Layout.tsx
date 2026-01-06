import Footer from './Footer/Footer';
import { Header } from './Header/Header';
import './Layout.scss';
type Props = {
  children: React.ReactNode;
};
export function Layout({ children }: Props) {
  return (
    <div className="Layout">
      <Header />
      <div className="Layout__content">{children}</div>
      <Footer />
    </div>
  );
}
