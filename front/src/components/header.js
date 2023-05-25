import { Link } from "react-router-dom";
import "../styles/navbar.css";

export default function Header() {
  return (
    <>
      <nav className="nav">
        <div className="nav__container">
          <Link to="/">
            <img className="logo" src="logo.png" alt="logo" />
          </Link>
          <div className="nav__menu" id="nav-menu">
            <ul className="nav__list">
              <li className="nav__item">
                <Link to="/produits" className="nav__link">
                  Les Produits
                </Link>
              </li>
              <li className="nav__item">
                <Link to="/login" className="nav__link">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
