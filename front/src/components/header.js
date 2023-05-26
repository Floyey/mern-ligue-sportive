import { Link } from "react-router-dom";
import "../styles/navbar.css";
import { useEffect, useState } from "react";
let v;
export default function Header({ test, setTest }) {
  const [role, setRole] = useState();
  const loagout = () => {
    localStorage.removeItem("userInfo");
    setTest(localStorage.getItem("userInfo"));
  };

  useEffect(() => {
    if (typeof test === "object" && test !== null) {
      setRole(test.data.role);
    } else if (typeof test !== "object" && test !== null) {
      v = JSON.parse(test);
      setRole(v.data.role);
    } else if (typeof v === "undefined" || typeof v === []) {
      setRole("");
    }
  }, [test]);

  return (
    <header>
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

              {test !== null && (
                <li className="nav__item">
                  <Link to="/profile" className="nav__link">
                    Profil
                  </Link>
                </li>
              )}
              {test !== null && role === "admin" && (
                <li className="nav__item">
                  <Link to="/dashboard" className="nav__link">
                    Dashboard
                  </Link>
                </li>
              )}
              <li className="nav__item">
                <Link to="/cart" className="nav__link">
                  Panier
                </Link>
              </li>
              {test === null ? (
                <li className="nav__item">
                  <Link to="/login" className="nav__link">
                    Login
                  </Link>
                </li>
              ) : (
                <>
                  <li className="nav__item">
                    <Link to="/" className="nav__link" onClick={loagout}>
                      Logout
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
