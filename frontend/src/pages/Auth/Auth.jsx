import { useState } from 'react';
import './Auth.css';

function Auth() {
  const [login, setMovieName] = useState('');

  return (
    <div className="Auth-container">
      <h1>NetfliCS</h1>
      <div>
        {' '}
        <p>Login : </p>
        <input
          id="search"
          placeholder="Rechercher..."
          type="text"
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
        />
      </div>
      <button onClick={() => setCounter(counter + 1)}>Increment counter</button>
    </div>
  );
}

export default Auth;
