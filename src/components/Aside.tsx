import { NavItem } from './NavItem';
import { Header } from './Header';
import shoppingBag from '../images/icons/shopping-bag.svg';
import favoritesGoods from '../images/icons/favourites-goods.svg';

export const navItemsFooter = [
  { id: 1, title: 'github', link: 'github' },
  { id: 2, title: 'contacts', link: 'contacts' },
  { id: 3, title: 'rights', link: 'rights' },
];

export const Aside = () => {
  return (
    <aside
      className="fixed inset-0 z-10 flex flex-col
        justify-between bg-white"
    >
      <div className="flex flex-col gap-6">
        <Header className="static" />

        <nav className="flex items-center justify-center md:hidden">
          <ul
            className="
              flex h-full flex-col gap-4 md:flex-row md:gap-8 lg:gap-16
            "
          >
            {[
              { id: 1, title: 'home', link: '/' },
              { id: 2, title: 'phones', link: 'phones' },
              { id: 3, title: 'tablets', link: 'tablets' },
              { id: 4, title: 'accessories', link: 'accessories' },
            ].map(item => (
              <li className="flex h-7 justify-center md:h-full" key={item.id}>
                <NavItem to={item.link}>{item.title}</NavItem>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="flex h-16">
        <NavItem
          to="#/f"
          className="flex w-full cursor-pointer
            items-center justify-center	border-l
            border-t border-elements"
        >
          <img src={shoppingBag} alt="Aside Close" />
        </NavItem>

        <NavItem
          to="/"
          className="flex w-full cursor-pointer
            items-center justify-center	border-l
            border-t border-elements"
        >
          <img src={favoritesGoods} alt="Aside Close" />
        </NavItem>
      </div>
    </aside>
  );
};
