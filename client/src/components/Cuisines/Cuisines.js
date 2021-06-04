import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Row, Container } from "react-bootstrap";

import { getCuisines } from "../../actions/cuisines";

import Cuisine from "./Cuisine/Cuisine";
import Empty from "../common/Empty/Empty";
import Loading from "../common/Loading/Loading";

const Cuisines = () => {
  const { cuisines, isLoadingCuisine } = useSelector((state) => state.cuisines);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCuisines());
  }, [dispatch]);

  if (!cuisines.length && !isLoadingCuisine)
    return <Empty title="No Cuisines Available" />;

  return isLoadingCuisine ? (
    <Loading />
  ) : (
    <Container>
      <h1 className="d-flex justify-content-center">Select A Cuisine</h1>
      <Row>
        {cuisines.map((cuisine) => (
          <Cuisine
            key={cuisine._id}
            id={cuisine._id}
            icon={cuisine.icon}
            name={cuisine.name}
          />
        ))}
      </Row>
    </Container>
  );
};

export default Cuisines;
