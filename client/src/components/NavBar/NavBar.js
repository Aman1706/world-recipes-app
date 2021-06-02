import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Navbar, Button, Image } from "react-bootstrap";

import recipeImg from "../../images/recipe.svg";
import { LOGOUT } from "../../constants/actionTypes";

import { Link, useHistory, useLocation } from "react-router-dom";
import decode from "jwt-decode";

import "./NavBar.css";

const Nav = ({ user, setUser }) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch({ type: LOGOUT });
    history.push("/");
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <Navbar
      sticky="top"
      expand="lg"
      bg="dark"
      variant="dark"
      className="flex-column flex-md-row mb-5"
    >
      <div className="mr-md-auto">
        <Link to="/">
          <Image
            src={recipeImg}
            width="200"
            height="50"
            className="d-inline-block align-top"
            alt="World Recipes Logo"
          />
        </Link>
      </div>

      {user ? (
        <>
          {user?.result.imageUrl ? (
            <Image
              src={user?.result.imageUrl}
              alt={user?.result.name}
              height="50"
              width="50"
              roundedCircle
              className="mr-md-5"
            />
          ) : (
            <div className="circle mr-md-5">{user?.result.name.charAt(0)}</div>
          )}

          <h6 className="text-white mr-md-5">{user?.result?.name}</h6>
          <Button variant="danger" onClick={logout}>
            Logout
          </Button>
        </>
      ) : (
        <Link to="/auth">
          <Button variant="primary">Sign In</Button>
        </Link>
      )}
    </Navbar>
  );
};

export default Nav;
