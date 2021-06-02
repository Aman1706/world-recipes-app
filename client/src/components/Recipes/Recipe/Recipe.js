import React from "react";
import { useDispatch } from "react-redux";

import { Col, Card, Dropdown } from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import { deleteRecipe } from "../../../actions/recipes";

import "./Recipe.css";

const Recipe = ({ recipe }) => {
  const user = JSON.parse(localStorage.getItem("profile"));

  const dispatch = useDispatch();

  const checkDifficulty = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "text-success";
      case "Medium":
        return "text-warning";
      case "Hard":
        return "text-danger";
      default:
        return "text-success";
    }
  };

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href="/"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {<BsThreeDots />}
      {children}
    </a>
  ));

  const handleDelete = async (recipeId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0a5ffe",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
      if (result.isConfirmed) {
        dispatch(deleteRecipe(recipeId));
        Swal.fire({
          title: "Deleted!",
          text: "Your recipe has been deleted.",
          icon: "success",
          confirmButtonColor: "#0a5ffe",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Col className="mt-5" xm={12} sm={12} md={6} lg={4}>
      <Card className="h-100">
        <Link to={`/recipes/${recipe?._id}`} className="h-100">
          <div className="image-wrapper">
            <Card.Img variant="top" src={recipe?.image} className="image" />
          </div>
          <Card.Body>
            <Card.Title className="mb-3">{recipe?.name}</Card.Title>
            <span className="d-flex flex-row justify-content-between mb-3">
              <Card.Subtitle className="text-muted">
                Difficulty :{" "}
                <span className={checkDifficulty(recipe?.difficulty)}>
                  {recipe?.difficulty}
                </span>
              </Card.Subtitle>
              <Card.Subtitle className="text-muted">
                {recipe?.duration.hours > 0
                  ? `Duration :${recipe?.duration?.hours}h ${recipe?.duration?.minutes}m`
                  : `Duration : ${recipe?.duration?.minutes}m`}
              </Card.Subtitle>
            </span>
            <Card.Text>{recipe?.description}</Card.Text>
          </Card.Body>
        </Link>
        <Card.Footer>
          <span className="d-flex flex-row justify-content-between">
            <small className="text-muted">By {recipe?.creator}</small>
            {(user?.result._id === recipe?.user ||
              user?.result.googleId === recipe?.user) && (
              <Dropdown>
                <Dropdown.Toggle as={CustomToggle}></Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to={`/recipes/edit/${recipe?._id}`}>
                    <small>Edit</small>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleDelete(recipe?._id)}>
                    <small>Delete</small>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </span>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default Recipe;
