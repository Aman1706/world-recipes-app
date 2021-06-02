import React from "react";

import { Col, Card } from "react-bootstrap";

import { Link } from "react-router-dom";

const Cuisine = ({ id, icon, name }) => {
  return (
    <Col className="mt-5" xm={12} sm={12} md={4} lg={3}>
      <Link to={`/cuisines/${id}`}>
        <Card>
          <Card.Img variant="top" src={icon} className="p-3" />
          <Card.Body>
            <Card.Title className="text-center">{name}</Card.Title>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
};

export default Cuisine;
