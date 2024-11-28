import logo from "../images/logo_aroundUSA.svg";
import { Link, useLocation } from "react-router-dom";

function Header({ isLoggedIn, onSignOut, userEmail }) {
  const location = useLocation();
  let linkText;
  let linkPath;

  if (isLoggedIn) {
    linkText = "Cerrar sesión";
    linkPath = "/signin";
  } else if (location.pathname === "/signin") {
    linkText = "Regístrate";
    linkPath = "/signup";
  } else if (location.pathname === "/signup") {
    linkText = "Iniciar sesión";
    linkPath = "/signin";
  }

  return (
    <header className="header">
      <img
        src={logo}
        alt="Logo de Alredero de EE.UU."
        className="header__logo"
        id="header-logo"
      />
      <nav className="navBar">
        {isLoggedIn ? (
          <>
            <button className="navBar__button" onClick={onSignOut}>
              Cerrar Sessión
            </button>
            <p className="navBar__text">{userEmail}</p>{" "}
          </>
        ) : (
          <>
            <Link className="navBar__link" to={linkPath}>
              {linkText}
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
export default Header;
