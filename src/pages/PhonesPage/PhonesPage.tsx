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
import products from '../../api/products.json';
import { ProductsList } from '../../components/Main/ProductsList/ProductsList';

import './PhonesPage.scss';
import { Product } from '../../react-app-env';
import { NotFound } from '../../components/NotFound/NotFound';

export const PhonesPage = () => {
  const onlyPhones = products.filter(item => item.type === 'phone');
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
  const [
    currentListForRender,
    setCurrentListForRender,
  ] = useState<Product[]>(onlyPhones);
  let sorted = [];

  const handleChangeSortBy = (event: SelectChangeEvent) => {
    setSortBy(event.target.value as string);
  };

  const handleChangeItemsPerPage = (event: SelectChangeEvent) => {
    setItemsPerPage(event.target.value as string);
  };

  useEffect(() => {
    switch (sortBy) {
      case 'age':
        sorted = [...currentListForRender.sort((a, b) => a.age - b.age)];
        setCurrentListForRender(sorted);

        // eslint-disable-next-line no-console
        console.log('age:', sorted);
        break;

      case 'name':
        sorted = [...currentListForRender
          .sort((a, b) => a.name.localeCompare(b.name))];
        setCurrentListForRender(sorted);
        // eslint-disable-next-line no-console
        console.log('name:', sorted);
        break;

      case 'price':
        sorted = [...currentListForRender
          .sort((a, b) => a.price - b.price)];
        setCurrentListForRender(sorted);
        // eslint-disable-next-line no-console
        console.log('price:', sorted);
        break;

      default:
        setCurrentListForRender(onlyPhones);
        break;
    }
  }, [sortBy]);

  const navigate = useNavigate();

  return (
    <div className="phonespage">
      <Header />
      <div className="phonespage__container">
        <div className="phonespage__boximghomearrow">
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
              className="phonespage__imghome"
            />
          </IconButton>

          <div className="phonespage__arrow" />
          <div className="phonespage__namepage">Phones</div>
        </div>
        <h1 className="phonespage__title">Mobile phones</h1>
        <p className="phonespage__countmodels">
          { onlyPhones.length }
          models
        </p>
        <div className="phonespage__boxselectors">
          <div className="phonespage__sortby">
            <label
              className="phonespage__labelname"
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
                    className="phonespage__select"
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

          <div className="phonespage__sortby">
            <label
              className="phonespage__labelname"
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
                    className="phonespage__select"
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
      {!onlyPhones.length && <NotFound />}
      <div className="phonespage__boxcards">
        <ProductsList
          currentListForRender={currentListForRender}
          itemsPerPage={itemsPerPage}
        />
      </div>
      <Footer />
    </div>
  );
};
