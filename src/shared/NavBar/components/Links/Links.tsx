import React from 'react';
import { useTheme } from '../../../../context/PageTheme';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import styles from './../../NavBar.module.scss';

// this component does not have its own styles because most of the styles it uses are common to elements from NavBar

const links = ['home', 'phones', 'tablets', 'accessories'];
const linksUA = ['головна', 'смартфони', 'планшети', 'aксесуари'];

export const ActiveLine = React.memo(() => {
  const { theme } = useTheme();

  return (
    <motion.div
      layoutId="activeLine"
      style={{
        height: '5px',
        position: 'absolute',
        bottom: '-1px',
        width: 'calc(100% - 10px)',
        backgroundColor: theme === 'light' ? '#000' : '#fff',
      }}
    />
  );
});

ActiveLine.displayName = 'ActiveLine';

export const LinkItem = React.memo(props => {
  const { item, isSelected, handleClick } = props;
  const { theme } = useTheme();

  //'#000' : '#89939A',

  return (
    <motion.div
      initial={{ color: '#000' }}
      animate={{ color: isSelected ? 'rgb(255, 0, 0)' : '#000' }}
      style={{ height: '100%' }}
      onClick={handleClick}
    >
      <NavLink
        style={{
          textTransform: 'uppercase',
          color: isSelected
            ? theme === 'light'
              ? '#000'
              : '#fff'
            : theme === 'light'
              ? '#89939A'
              : '#fff',
        }}
        className={styles.links__item}
        to={
          links.includes(item) ? `/${item}` : `/${links[linksUA.indexOf(item)]}`
        }
      >
        {isSelected && <ActiveLine />}
        {item}
      </NavLink>
    </motion.div>
  );
});

LinkItem.displayName = 'LinkItem';

export default LinkItem;
