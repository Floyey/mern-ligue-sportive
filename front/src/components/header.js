import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="nav">
      <Link to="/">
        <img className="logo" src="logo.png" alt="logo" />
      </Link>
      <Link to="/produits"> Les Produits</Link>
    </div>
  );
}
