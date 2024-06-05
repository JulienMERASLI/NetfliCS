import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <div className="Header-container">
      <Link className="Link" to="/">
        Home
      </Link>
      <Link className="Link" to="/login">
        Login
      </Link>
      <Link className="Link" to="/users">
        Users
      </Link>
      <Link className="Link" to="/about">
        About
      </Link>
      <form method="POST" action="http://localhost:8000/logout">
        <button className="Link">Logout</button>
      </form>
    </div>
  );
};

export default Header;
