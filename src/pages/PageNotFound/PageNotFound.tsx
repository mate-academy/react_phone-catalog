import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

import './PageNotFound.scss';

export const PageNotFound = () => (
  <motion.div
    className="page-not-found"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <h1 className="page-not-found--title">
      It looks like you`re lost
    </h1>

    <h1 className="page-not-found--subtitle">
      So let`s just go to the
      <NavLink
        to="/"
        className="page-not-found--link"
      >
        &nbsp;
        Home
      </NavLink>
    </h1>
  </motion.div>
);
