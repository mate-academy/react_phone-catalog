import React from 'react';
import Container from "@material-ui/core/Container";

const HomePage = () => (
  <React.Fragment>
    <Container maxWidth="sm">
      <h1>Welcome to Phone Catalog</h1>
      <img className="responsive-img" src="/img/telephone.jpg" width="100%"></img>
    </Container>
  </React.Fragment>
);

export default HomePage;
