/* eslint-disable max-len */
import React, { useState } from "react";


export const ThemeSwitcherProvider = () => {
  const [isSwitched, setIsSwitched] = useState(false);

  const handleSwitchTheme = () => {
    setIsSwitched(prev => !prev);
  };

  return (

  );
};
