import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useParams, useLocation, useHistory } from "react-router-dom";

import FileBase from "react-file-base64";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import {
  Container,
  Card,
  Form,
  Button,
  Image,
  Row,
  Col,
} from "react-bootstrap";
import Swal from "sweetalert2";

import {
  getRecipe,
  createRecipe,
  updateRecipe,
} from "../../../actions/recipes";

import Loading from "../../common/Loading/Loading";

const RecipeForm = () => {
  const [recipeData, setRecipeData] = useState({
    name: "",
    description: "",
    image: "",
    duration: { hours: "", minutes: "" },
    difficulty: "",
    ingredients: "",
    instructions: "",
  });
  const user = JSON.parse(localStorage.getItem("profile"));

  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();

  const { recipe, isLoading } = useSelector((state) => state.recipes);

  const dispatch = useDispatch();

  useEffect(() => {
    id && dispatch(getRecipe(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (id && recipe) setRecipeData(recipe);
  }, [recipe, id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true;
    let title;

    if (!recipeData.name) {
      isValid = false;
      title = "Please enter the name";
    } else if (!recipeData.description) {
      isValid = false;
      title = "Please add a description";
    } else if (!recipeData.image) {
      isValid = false;
      title = "Please add an image";
    } else if (!recipeData.duration) {
      isValid = false;
      title = "Please add the duration";
    } else if (
      !recipeData.difficulty ||
      recipeData.difficulty === "Select the difficulty level"
    ) {
      isValid = false;
      title = "Please add the difficulty";
    } else if (
      !recipeData.ingredients ||
      recipeData.ingredients === "<p><br></p>"
    ) {
      isValid = false;
      title = "Please add the ingredients";
    } else if (
      !recipeData.instructions ||
      recipeData.instructions === "<p><br></p>"
    ) {
      isValid = false;
      title = "Please add the instructions";
    }

    if (title) {
      Swal.fire({
        title,
        confirmButtonColor: "#0a5ffe",
      });
    }

    if (isValid) {
      if (id) {
        dispatch(
          updateRecipe(
            id,
            { ...recipeData, creator: user?.result?.name },
            history
          )
        );
      } else {
        dispatch(
          createRecipe(
            {
              ...recipeData,
              creator: user?.result?.name,
              cuisine: location.state,
            },
            history
          )
        );
      }

      Swal.fire({
        icon: "success",
        confirmButtonColor: "#0a5ffe",
        title: `Recipe Successfully ${id ? "Edited" : "Created"}!`,
      });

      setRecipeData({
        name: "",
        description: "",
        image: "",
        duration: { hours: "", minutes: "" },
        difficulty: "",
        ingredients: "",
        instructions: "",
      });
    }
  };

  return id && isLoading ? (
    <Loading />
  ) : (
    <Container className="d-flex justify-content-center mt-5">
      <Card style={{ width: "90%" }}>
        <Card.Body>
          <h3 className="mt-3 mb-4 text-center">
            {id ? "Edit" : "Add"} Recipe
          </h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                value={recipeData.name}
                type="text"
                placeholder="Enter a name"
                onChange={(e) =>
                  setRecipeData({ ...recipeData, name: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                as="textarea"
                value={recipeData.description}
                rows={3}
                placeholder="Add a short description(in less that 50 words)"
                onChange={(e) => {
                  if (
                    e.target.value.replace(/\s/g, " ").split(" ").length <= 50
                  ) {
                    setRecipeData({
                      ...recipeData,
                      description: e.target.value,
                    });
                  }
                }}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Image</Form.Label>
              <div className="mb-2">
                {recipeData.image && (
                  <Image
                    src={recipeData.image}
                    rounded
                    style={{ width: "8em" }}
                    className="mr-5"
                  />
                )}
              </div>
              <div>
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) =>
                    setRecipeData({ ...recipeData, image: base64 })
                  }
                />
              </div>
            </Form.Group>

            <Form.Group>
              <Form.Label>Duration</Form.Label>
              <Row>
                <Col>
                  <Form.Label>Hours(optional)</Form.Label>
                  <Form.Control
                    value={recipeData.duration.hours}
                    name="hours"
                    type="text"
                    rows={3}
                    placeholder="Enter the number of hours"
                    onChange={(e) => {
                      const re = /^[0-9\b]+$/;
                      if (e.target.value === "" || re.test(e.target.value)) {
                        setRecipeData({
                          ...recipeData,
                          duration: {
                            ...recipeData.duration,
                            hours: e.target.value,
                          },
                        });
                      }
                    }}
                  />
                </Col>
                <Col>
                  <Form.Label>Minutes</Form.Label>
                  <Form.Control
                    value={recipeData.duration.minutes}
                    name="minutes"
                    type="text"
                    rows={3}
                    placeholder="Enter the number of minutes"
                    onChange={(e) => {
                      const re = /^[0-9\b]+$/;
                      if (e.target.value === "" || re.test(e.target.value)) {
                        setRecipeData({
                          ...recipeData,
                          duration: {
                            ...recipeData.duration,
                            minutes: e.target.value,
                          },
                        });
                      }
                    }}
                  />
                </Col>
              </Row>
            </Form.Group>

            <Form.Group>
              <Form.Label>Difficulty</Form.Label>
              <Form.Control
                as="select"
                value={recipeData.difficulty}
                onChange={(e) =>
                  setRecipeData({ ...recipeData, difficulty: e.target.value })
                }
              >
                <option>Select the difficulty level</option>
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Ingredients</Form.Label>
              <ReactQuill
                value={recipeData.ingredients}
                onChange={(value) =>
                  setRecipeData({
                    ...recipeData,
                    ingredients: value,
                  })
                }
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Instructions</Form.Label>
              <ReactQuill
                value={recipeData.instructions}
                onChange={(value) =>
                  setRecipeData({
                    ...recipeData,
                    instructions: value,
                  })
                }
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="float-right">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RecipeForm;
