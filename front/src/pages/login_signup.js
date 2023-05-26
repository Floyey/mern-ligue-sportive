import { Fragment, useEffect, useState } from "react";
import "../styles/login_signup.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { getErrorFromBackend } from "./../utils";

function Login({ setTest }) {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectUrl ? redirectUrl : "/";

  const [userdata, setUserdata] = useState([]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUserdata((values) => ({ ...values, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(
        `http://localhost:5000/api/user/signin/${userdata.mail}`,
        {
          password: userdata.password,
        }
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      setTest(localStorage.getItem("userInfo"));
      navigate(redirect || "/");
    } catch (error) {
      toast.error(getErrorFromBackend(error));
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(
        `http://localhost:5000/api/user/register`,
        userdata
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/");
    } catch (error) {
      toast.error(getErrorFromBackend(error));
    }
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("userInfo"))) {
      navigate(redirect);
    }
    const signInButton = document.getElementById("signIn");
    const signUpButton = document.getElementById("signUp");
    const container = document.getElementById("container");

    signUpButton.addEventListener("click", () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener("click", () => {
      const container = document.getElementById("container");
      container.classList.remove("right-panel-active");
    });

    return () => {
      signInButton.removeEventListener("click", () => {});
      signUpButton.removeEventListener("click", () => {});
    };
  }, [navigate, redirect]);

  return (
    <Fragment>
      <div className="signIn-signUp">
        <div className="container" id="container">
          <div className="form-container sign-up-container">
            <form onSubmit={handleSignup}>
              <h1>Créer un compte</h1>
              <br />
              <input
                type="text"
                placeholder="Name"
                name="name"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                placeholder="firstname"
                name="firstname"
                onChange={handleChange}
                required
              />
              <input
                type="number"
                placeholder="phone_number"
                name="phone_number"
                onChange={handleChange}
                required
              />
              <input
                type="email"
                placeholder="Adresse mail"
                name="mail"
                onChange={handleChange}
                required
              />
              <input
                type="password"
                placeholder="password"
                name="password"
                onChange={handleChange}
                required
              />
              <button>S'inscrire</button>
            </form>
          </div>
          <div className="form-container sign-in-container">
            <form onSubmit={handleLogin}>
              <h1>Se connecter</h1>
              <br />
              <input
                type="email"
                placeholder="Adresse mail"
                name="mail"
                onChange={handleChange}
                required
              />
              <input
                type="password"
                placeholder="password"
                name="password"
                onChange={handleChange}
                required
              />
              <Link to="#">Mot de passe oublié ?</Link>
              <button>Se connecter</button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>De retour ?</h1>
                <p>Pour rester connecter avec la communauté</p>
                <button className="ghost" id="signIn">
                  Se connecter
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Salut !</h1>
                <p>Bienvenue sur notre site !</p>
                <button className="ghost" id="signUp">
                  S'inscrire
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Login;
