import { Link } from "react-router-dom";
import "../styles/navbar.css";
import { useEffect } from "react";

export default function Header({ test, setTest }) {
  const loagout = () => {
    localStorage.removeItem("userInfo");
    setTest(localStorage.getItem("userInfo"));
  };

  useEffect(() => {
    console.log(localStorage.getItem("userInfo") !== null);
  }, [test]);
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
                <Link to="/products" className="nav__link">
                  Les Produits
                </Link>
              </li>
              {!test ? (
                <li className="nav__item">
                  <Link to="/login" className="nav__link">
                    Login
                  </Link>
                </li>
              ) : (
                <li className="nav__item">
                  <Link to="/" className="nav__link" onClick={loagout}>
                    Logout
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
