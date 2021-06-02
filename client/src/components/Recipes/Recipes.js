import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

import {
  Row,
  Container,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";

import { BsSearch } from "react-icons/bs";

import { getRecipesByCuisineId, searchRecipe } from "../../actions/recipes";
import { getCuisines } from "../../actions/cuisines";

import Recipe from "./Recipe/Recipe";
import Empty from "../common/Empty/Empty";
import Loading from "../common/Loading/Loading";

const Recipes = () => {
  const { id } = useParams();
  const { recipes, isLoading } = useSelector((state) => state.recipes);
  const cuisine = useSelector((state) =>
    state.cuisines.cuisines.find((cuisine) => cuisine._id === id)
  );
  const [search, setSearch] = useState("");

  const user = JSON.parse(localStorage.getItem("profile"));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCuisines());
    dispatch(getRecipesByCuisineId(id));
  }, [id, dispatch]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (!e.target.value) {
      dispatch(getRecipesByCuisineId(id));
    }
    dispatch(searchRecipe(e.target.value));
  };

  return isLoading ? (
    <Loading />
  ) : (
    <Container>
      <h1 className="d-flex justify-content-center">{cuisine?.name} Recipes</h1>
      <InputGroup className="my-3">
        <FormControl
          name="search"
          type="search"
          value={search}
          placeholder="Search Recipes"
          onChange={handleSearch}
        />
        <InputGroup.Append>
          <Button disabled variant="outline-secondary">
            <BsSearch />
          </Button>
        </InputGroup.Append>
      </InputGroup>
      <div className="d-flex justify-content-center justify-content-md-end mt-3">
        <Link
          to={{
            pathname: "/recipes/create",
            state: cuisine?._id,
          }}
        >
          <Button disabled={user ? false : true} variant="primary">
            {user ? "Add a recipe" : "Please Login to add a recipe"}
          </Button>
        </Link>
      </div>
      {!recipes.length && !isLoading ? (
        <Empty title="No Recipes Available" />
      ) : (
        <Row>
          {recipes.map((recipe) => (
            <Recipe key={recipe._id} recipe={recipe} isLoading={isLoading} />
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Recipes;
