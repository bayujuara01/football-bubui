import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import M from "materialize-css/dist/js/materialize";

export default function Nav() {
  useEffect(() => {
    M.AutoInit();
  }, []);

  const closeNav = () => {
    const elem = document.querySelector(".sidenav");
    M.Sidenav.getInstance(elem).close();
  };

  return (
    <nav className="a-bg-main" role="navigation">
      <div className="nav-wrapper container">
        <a
          href="/"
          className="brand-logo a-site-title center"
          id="logo-container"
        >
          FootBubui
        </a>
        <a
          href="/#home"
          className="sidenav-trigger a-block"
          data-target="nav-mobile"
        >
          <i className="fas fa-bars"></i>
        </a>
        <ul className="sidenav" id="nav-mobile" onClick={closeNav}>
          <li>
            <Link to="/">
              <i className="fa fa-home"></i> Home
            </Link>
          </li>
          <li>
            <Link to="/klasemen">
              <i className="fa fa-table"></i> Klasemen
            </Link>
          </li>
          <li>
            <Link to="/jadwal">
              <i className="fa fa-calendar"></i> Jadwal
            </Link>
          </li>
          <li>
            <Link to="/favorit">
              <i className="fa fa-heart"></i> Favorit
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
