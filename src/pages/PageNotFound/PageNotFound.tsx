import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import './PageNotFound.scss';

export const PageNotFound = () => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <motion.div className="page-not-found">
      {showLoader && <Loader />}
      {!showLoader && (
        <>
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
        </>
      )}
    </motion.div>
  );
};
