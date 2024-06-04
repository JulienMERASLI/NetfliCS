import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  function logout() {
    fetch('http://localhost:8000/logout', {
      method: 'POST',
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      });
  }

  return (
    <div className="Header-container">
      <Link className="Link" to="/">
        Home
      </Link>
      <Link className="Link" to="/counter">
        Counter
      </Link>
      <Link className="Link" to="/users">
        Users
      </Link>
      <Link className="Link" to="/about">
        About
      </Link>
      <button className="Link" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Header;
