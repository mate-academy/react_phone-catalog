import React from 'react';
import { NavLink } from 'react-router-dom';
import './Logo.scss';

export const Logo: React.FC = () => (
  <NavLink to="/" className="Logo icon" />
);
