import React, { useState } from "react";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import Cuisines from "./components/Cuisines/Cuisines";
import Auth from "./components/Auth/Auth";

import "bootstrap/dist/css/bootstrap.min.css";

import Recipes from "./components/Recipes/Recipes";
import RecipeForm from "./components/Recipes/RecipeForm/RecipeForm";
import RecipeDetails from "./components/Recipes/RecipeDetails/RecipeDetails";

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  return (
    <BrowserRouter>
      <NavBar user={user} setUser={setUser} />
      <Switch>
        <Route path="/" exact component={() => <Redirect to="/cuisines" />} />
        <Route path="/cuisines" exact component={Cuisines} />
        <Route path="/cuisines/:id" exact component={Recipes} />
        <Route
          path="/recipes/create"
          exact
          component={() =>
            user ? <RecipeForm /> : <Redirect to="/cuisines" />
          }
        />
        <Route
          path="/recipes/edit/:id"
          exact
          component={() =>
            user ? <RecipeForm /> : <Redirect to="/cuisines" />
          }
        />
        <Route path="/recipes/:id" exact component={RecipeDetails} />
        <Route
          path="/auth"
          exact
          component={() => (!user ? <Auth /> : <Redirect to="/cuisines" />)}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
