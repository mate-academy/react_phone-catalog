import { Outlet } from 'react-router-dom';
import { NavBar } from '../NavBar/NavBar';
import { Footer } from '../Footer/Footer';

type Props = {
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
};

export function BasicLayout({ setSearchInput }: Props) {
  return (
    <>
      <NavBar setSearchInput={setSearchInput} />
      <Outlet />
      <Footer />
    </>
  );
}
