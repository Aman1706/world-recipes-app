import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import parse from "html-react-parser";

import { Container, Card, Image, Button } from "react-bootstrap";

import { getRecipe } from "../../../actions/recipes";

import Loading from "../../common/Loading/Loading";

import "./RecipeDetails.css";

const RecipeDetails = () => {
  const { recipe, isLoading } = useSelector((state) => state.recipes);
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecipe(id));
  }, [id, dispatch]);

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

  if (isLoading) return <Loading />;

  return (
    <Container>
      <div className="d-flex justify-content-center justify-content-md-start mt-3">
        <Link to={`/cuisines/${recipe?.cuisine?._id}`}>
          <Button>Go Back to All Recipes</Button>
        </Link>
      </div>
      <Card className="d-flex justify-content-center mt-5">
        <Card.Body>
          <h1 className="text-center mb-5">{recipe?.name}</h1>
          <p className="mb-5 mx-3">{recipe?.description}</p>
          <div className="d-flex flex-column flex-md-row justify-content-around mb-5">
            <Image
              src={recipe?.image}
              className="image-size mb-4 mb-md-0 mr-md-2"
            />
            <Card>
              <Card.Body className="mx-2">
                <p>
                  <span className="font-weight-bold">Duration</span>:{" "}
                  {recipe?.duration?.hours > 0
                    ? `${recipe?.duration?.hours}h ${recipe?.duration?.minutes}m`
                    : `${recipe?.duration?.minutes}m`}
                </p>
                <p>
                  <span className="font-weight-bold">Duration</span>:{" "}
                  <span className={checkDifficulty(recipe?.difficulty)}>
                    {recipe?.difficulty}
                  </span>
                </p>
                <h3>Ingredients</h3>
                {recipe?.ingredients && parse(recipe?.ingredients)}
              </Card.Body>
            </Card>
          </div>
          <div className="mx-3">
            <h3>Instructions</h3>
            {recipe?.instructions && parse(recipe?.instructions)}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RecipeDetails;
