import React from 'react'
import {Route, Switch, NavLink} from 'react-router-dom';
import HomePage from "./HomePage";
import Phone from "./Phone";
import PhonesPage from "./PhonesPage";
import Cart from "./Cart";
import NotFoundPage from "./NotFoundPage";
import {connect} from "react-redux";
import Badge from "@material-ui/core/Badge";
import {fade, makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import ShopTwoIcon from '@material-ui/icons/ShopTwo';
import HomeIcon from '@material-ui/icons/Home';


const Header = ({phonesInCart}) => {
  const useStyles = makeStyles(theme => ({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 200,
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  }));

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{vertical: 'top', horizontal: 'right'}}
      id={menuId}
      keepMounted
      transformOrigin={{vertical: 'top', horizontal: 'right'}}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{vertical: 'top', horizontal: 'right'}}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{vertical: 'top', horizontal: 'right'}}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <NavLink to="/">Home</NavLink>
      </MenuItem>
      <MenuItem>
        <NavLink to="/phones-page">Shop</NavLink>
      </MenuItem>
      <MenuItem>
        <NavLink to="/cart">
          Cart
        </NavLink>
        <Badge badgeContent={phonesInCart.length} color="secondary">
        </Badge>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            KamRus
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon/>
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{'aria-label': 'search'}}
            />
          </div>
          <div className={classes.grow}/>
          <div className={classes.sectionDesktop}>
            <MenuItem>
              <NavLink to="/">
                <HomeIcon fontSize="large"/>
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to="/phones-page">
                <ShopTwoIcon fontSize="large"/>
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to="/cart">
                <Badge badgeContent={phonesInCart.length} color="secondary">
                  <ShoppingCartIcon fontSize="large"/>
                </Badge></NavLink>
            </MenuItem>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon/>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}

      <Switch>
        <Route path="/" exact component={HomePage}/>
        <Route path="/phones-page/:phoneId" component={Phone}/>
        <Route path="/phones-page" exact component={PhonesPage}/>
        <Route path="/cart" component={Cart}/>
        <Route path="/" component={NotFoundPage}/>
      </Switch>
    </div>
  );
}


const mapStateToProps = (state) => {
  return {
    phonesInCart: state.phonesInCart
  }
}

export default connect(mapStateToProps)(Header)
