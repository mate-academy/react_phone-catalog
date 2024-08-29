import * as React from 'react';
import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import { Link, useLocation } from 'react-router-dom';
import { GlobalContext } from '../GlobalContext/GlobalContext';

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const { isSunSelected } = React.useContext(GlobalContext);

  const color = !isSunSelected ? '#fff' : '#000';
  const hoverColor = emphasize(color, 0.6);

  return {
    cursor: 'pointer',
    backgroundColor: 'transparent',
    height: theme.spacing(3),
    color,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      color: hoverColor,
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      color: '#000000',
    },
  };
}) as typeof Chip;

const DisabledBreadcrumb = styled(Chip)(({ theme }) => ({
  cursor: 'default',
  backgroundColor: 'transparent',
  height: theme.spacing(3),
  color: '#75767F',
  fontWeight: theme.typography.fontWeightRegular,
})) as typeof Chip;

function handleClick(event: React.MouseEvent<Element, MouseEvent>) {
  event.preventDefault();

  // eslint-disable-next-line no-console
  console.info('You clicked a breadcrumb.');
}

export default function CustomizedBreadcrumbs() {
  const { isSunSelected } = React.useContext(GlobalContext);
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);
  const homeIconSrc = !isSunSelected
    ? './img/breadCrambs/dark.svg'
    : './img/breadCrambs/homeBack.svg';

  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={
          <img
            src="img/breadCrambs/arrowRight.svg"
            alt="Separator"
            style={{
              width: '16px',
              height: '16px',
              marginLeft: '-10px',
              marginRight: '-10px',
              alignItems: 'center',
            }}
          />
        }
      >
        <StyledBreadcrumb
          component={Link}
          to="/"
          icon={
            <img
              src={homeIconSrc}
              alt="Home"
              style={{ width: '16px', height: '16px', marginBottom: '3px' }}
            />
          }
        />
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;

          return index === pathnames.length - 1 ? (
            <DisabledBreadcrumb
              key={to}
              label={value.charAt(0).toUpperCase() + value.slice(1)}
            />
          ) : (
            <StyledBreadcrumb
              key={to}
              component={Link}
              to={to}
              label={value.charAt(0).toUpperCase() + value.slice(1)}
            />
          );
        })}
      </Breadcrumbs>
    </div>
  );
}
