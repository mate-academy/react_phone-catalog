import {
  AppBar, Toolbar, IconButton, Badge,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Header.scss';
import { Logo } from '../Logo/Logo';
import { Nav } from '../Nav/Nav';
import { Search } from '../Search/Search';

import {
  getFavoritesSelector,
  getSelectedCartSelector,
} from '../../store/selectors';

export const Header = () => {
  const navigate = useNavigate();
  const currentFavorite = useSelector(getFavoritesSelector);
  const currentSelectedCart = useSelector(getSelectedCartSelector);

  return (
    <div>
      <AppBar
        position="static"
        sx={{
          backgroundColor: '#fff',
          mb: '40px',
        }}
      >
        <Toolbar className="header">
          <div className="header__container_left">
            <IconButton color="inherit">
              <Logo />
            </IconButton>
            <Nav />
          </div>
          <div className="header__container_right">
            <Search />
            <IconButton
              size="small"
              sx={{ padding: 0 }}
              onClick={() => {
                navigate('/favorites');
              }}
            >
              <div className="header__rectangle">
                <div className="header__boxbadge">
                  <Badge
                    color="secondary"
                    badgeContent={currentFavorite.length}
                  >
                    <div className="header__favorites" />
                  </Badge>
                </div>
              </div>
            </IconButton>
            <IconButton
              size="small"
              sx={{ padding: 0 }}
              onClick={() => {
                navigate('/cart');
              }}
            >
              <div className="header__rectangle">
                <div className="header__boxbadge">
                  <Badge
                    color="primary"
                    badgeContent={currentSelectedCart.length}
                  >
                    <div className="header__bag" />
                  </Badge>
                </div>
              </div>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};
