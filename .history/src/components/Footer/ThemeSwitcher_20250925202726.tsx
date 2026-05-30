import React, { useState } from "react";

/* eslint-disable max-len */


export const ThemeSwitcherProvider = () => {
  const [isSwitched, setIsSwitched] = useState(false);

  const handleSwitchTheme = () => {
    setIsSwitched(prev => !prev);
  };

  return (

  );
};
