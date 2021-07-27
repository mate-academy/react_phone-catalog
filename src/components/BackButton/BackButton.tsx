import React from "react";
import { useHistory } from "react-router";
import { HashLink } from "react-router-hash-link";

export const BackButton = () => {
  const history = useHistory();

  return (
    <HashLink 
      to={{hash: 'top'}}
      className="breadcrumb small-text back-button" 
      onClick={() => {
        history.goBack()
      }}
    >
      <i className="arrow_direction_left arrow_color_black"/> Back
    </HashLink>
  )
}