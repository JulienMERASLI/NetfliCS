import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <div className="Header-container">
      <Link className="Link" to="/">
        Home
      </Link>
      <Link className="Link" to="/auth">
        Auth
      </Link>
      <Link className="Link" to="/users">
        Users
      </Link>
      <Link className="Link" to="/about">
        About
      </Link>
    </div>
  );
};

export default Header;
