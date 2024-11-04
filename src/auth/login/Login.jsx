import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import handleChange from '../../util/handle-change';

import '../../stylesheet/auth.scss';
import '../../stylesheet/form.scss';

const Login = ({ login }) => {
  const [isValidToken, setIsValidToken] = useState(true);

  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: '',
    password: ''
  });

  const handleLoginClick = (event) => {
    event.preventDefault();
    login({ user, setIsValidToken, navigate });
  };

  return (
    <section className="form auth">
      <header>
        <h1>Login</h1>
      </header>

      <form>
        <fieldset>
          <fieldset>
            <label htmlFor="username">Username</label>
            <input
              name="username"
              id="username"
              type="text"
              value={user.username}
              onChange={(event) => handleChange(event, setUser)}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="password">Password </label>
            <input
              name="password"
              id="password"
              type="password"
              value={user.password}
              onChange={(event) => handleChange(event, setUser)}
            />
          </fieldset>
        </fieldset>
        {!isValidToken && <p>Invalid Credentials</p>}
        <fieldset>
          <button onClick={handleLoginClick}>Login</button>

          <Link to="/register">Register</Link>
        </fieldset>
      </form>
    </section>
  );
};

export default Login;
