import React from 'react';

const Title = (props: { title: React.ReactNode }) => {
  return (
    <h1 className="title">{props.title}</h1>
  );
};

export default Title;
