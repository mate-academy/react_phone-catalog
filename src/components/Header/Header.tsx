import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useCart, useFavorites } from '../../context';
import { updateSearchParams } from '../../utils';
import { Icon, IconName } from '../Icon';
import { Logo } from '../Logo';
import { Navigation } from '../Navigation';
import { SearchInput } from '../SearchInput';
import { ThemeSwitch } from '../ThemeSwitch';
import styles from './Header.module.scss';

const SEARCHABLE_PAGES: Record<string, string> = {
  '/phones': 'phones',
  '/tablets': 'tablets',
  '/accessories': 'accessories',
  '/favorites': 'favorites',
};

interface IconLinkProps {
  to: string;
  icon: IconName;
  label: string;
  count: number;
}

const IconLink = ({ to, icon, label, count }: IconLinkProps) => (
  <Link to={to} className={styles.header__action} aria-label={label}>
    <Icon name={icon} />
    {count > 0 && <span className={styles.header__counter}>{count}</span>}
  </Link>
);

export const Header = () => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { favoriteIds } = useFavorites();
  const { totalQuantity } = useCart();

  const searchableName = SEARCHABLE_PAGES[pathname];

  const handleSearch = (query: string) => {
    setSearchParams(
      updateSearchParams(searchParams, {
        query: query.trim() || null,
        page: null,
      }),
    );
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <Logo />
      </div>

      <Navigation />

      <div className={styles.header__actions}>
        {searchableName && (
          <div className={styles.header__search}>
            <SearchInput
              value={searchParams.get('query') ?? ''}
              placeholder={`Search in ${searchableName}...`}
              onChange={handleSearch}
            />
          </div>
        )}

        <ThemeSwitch />
        <IconLink
          to="/favorites"
          icon="heart"
          label="Favorites"
          count={favoriteIds.length}
        />
        <IconLink to="/cart" icon="cart" label="Cart" count={totalQuantity} />
      </div>
    </header>
  );
};
