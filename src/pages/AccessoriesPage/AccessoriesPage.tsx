import { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import { ProductsList } from '../../components/Main/ProductsList/ProductsList';

import './AccessoriesPage.scss';
import { Product } from '../../react-app-env';
import { NotFound } from '../../components/NotFound/NotFound';
import { Loader } from '../../components/Loader/Loader';
import { getProducts } from '../../api/api';

export const AccessoriesPage = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#313237',
      },
    },
    typography: {
      fontFamily: 'Mont-SemiBold, sans-serif',
      fontSize: 12,
    },
    shape: {
      borderRadius: 0,
    },
  });
  const [sortBy, setSortBy] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState('16');
  const [errorMsg, setErrorMsg] = useState('');
  const [
    currentListForRender,
    setCurrentListForRender,
  ] = useState<Product[]>([]);
  let sorted = [];

  const handleChangeSortBy = (event: SelectChangeEvent) => {
    setSortBy(event.target.value as string);
  };

  const handleChangeItemsPerPage = (event: SelectChangeEvent) => {
    setItemsPerPage(event.target.value as string);
  };

  useEffect(() => {
    getProducts()
      .then(result => {
        setCurrentListForRender(result
          .filter((item: { type: string; }) => item.type === 'accessory'));
      })
      .catch((error) => {
        setErrorMsg(`${error}`);
      });
  }, []);

  useEffect(() => {
    switch (sortBy) {
      case 'age':
        sorted = [...currentListForRender.sort((a, b) => a.age - b.age)];
        setCurrentListForRender(sorted);
        break;

      case 'name':
        sorted = [...currentListForRender
          .sort((a, b) => a.name.localeCompare(b.name))];
        setCurrentListForRender(sorted);
        break;

      case 'price':
        sorted = [...currentListForRender
          .sort((a, b) => a.price - b.price)];
        setCurrentListForRender(sorted);
        break;

      default:
        break;
    }
  }, [sortBy]);

  const navigate = useNavigate();

  return (
    <div className="accessorypage">
      <Header />
      <div className="accessorypage__container">
        <div className="accessorypage__boximghomearrow">
          <IconButton
            color="inherit"
            sx={{
              padding: '0',
            }}
            onClick={() => {
              navigate('/');
            }}
          >
            <div
              className="accessorypage__imghome"
            />
          </IconButton>

          <div className="accessorypage__arrow" />
          <div className="accessorypage__namepage">Accessories</div>
        </div>
        <h1 className="accessorypage__title">Accessories</h1>
        <p className="accessorypage__countmodels">
          { currentListForRender.length }
          {' '}
          models
        </p>
        <div className="accessorypage__boxselectors">
          <div className="accessorypage__sortby">
            <label
              className="accessorypage__labelname"
              htmlFor="sort-by"
            >
              Sort by
            </label>
            <ThemeProvider theme={theme}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl>
                  <Select
                    sx={{
                      padding: '0',
                      outlineStyle: 'none',
                    }}
                    value={sortBy}
                    onChange={handleChangeSortBy}
                    displayEmpty
                    id="sort-by"
                    className="accessorypage__select"
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="age">Newest</MenuItem>
                    <MenuItem value="name">Name</MenuItem>
                    <MenuItem value="price">Cheapest</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </ThemeProvider>
          </div>

          <div className="accessorypage__sortby">
            <label
              className="accessorypage__labelname"
              htmlFor="items-on-page"
            >
              Items on page
            </label>
            <ThemeProvider theme={theme}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl>
                  <Select
                    sx={{
                      padding: '0',
                      outlineStyle: 'none',
                    }}
                    value={itemsPerPage}
                    onChange={handleChangeItemsPerPage}
                    displayEmpty
                    id="items-on-page"
                    className="accessorypage__select"
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value="4">4</MenuItem>
                    <MenuItem value="8">8</MenuItem>
                    <MenuItem value="16">16</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </ThemeProvider>
          </div>
        </div>
      </div>
      {errorMsg.length !== 0
        && <p className="accessorypage__error">{errorMsg}</p>}
      {!currentListForRender.length && <NotFound />}
      {currentListForRender.length === 0 && <Loader />}
      <div className="accessorypage__boxcards">
        <ProductsList
          currentListForRender={currentListForRender}
          itemsPerPage={itemsPerPage}
        />
      </div>
      <Footer />
    </div>
  );
};
