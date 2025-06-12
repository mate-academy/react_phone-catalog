import { useEffect } from "react";
import { Container } from "../../components/container/Container";
import { PageNav } from "../../components/pageNav/PageNav";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchOneProducts } from "../../api/fetchOneTypeProducts";

export const DetailsProduct = () => {
 
  return <>
    <Container>
      <PageNav />
    </Container>  </>;

};
