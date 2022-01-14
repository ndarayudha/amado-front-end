import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import classes from "./Navbar.module.css";

const Navbar = () => {
  const [clicked, setClicked] = useState(false);
  const [choose, setChoose] = useState(false);

  const clickedHandler = () => {
    setClicked(!clicked);
    setChoose(!choose);
  };

  const chooseHandler = () => {
    setClicked(false);
    setChoose(false);
  };

  return (
    <nav className={classes.NavbarItems}>
      <Link to="/">
        <h1 className={classes["navbar-logo"]}>
          Amado <i className={classes["ic-amado"]}></i>
        </h1>
      </Link>
      <div className={classes["menu-icon"]} onClick={clickedHandler}>
        <i className={clicked && choose ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
      {/* <ul
        className={clicked ? classes["nav-menu-active"] : classes["nav-menu"]}
      >
        <li key="nav-1">
          <NavLink
            activeClassName={classes.active}
            className={classes["nav-links"]}
            to="/teknologi"
            onClick={chooseHandler}
          >
            Teknologi
          </NavLink>
        </li>
        <li key="nav-2">
          <NavLink
            activeClassName={classes.active}
            className={classes["nav-links"]}
            to="/untuk-rs"
            onClick={chooseHandler}
          >
            Untuk RS
          </NavLink>
        </li>
        <li key="nav-3">
          <NavLink
            activeClassName={classes.active}
            className={classes["nav-links"]}
            to="/download"
            onClick={chooseHandler}
          >
            Download
          </NavLink>
        </li>
      </ul> */}
    </nav>
  );
};

export default Navbar;
