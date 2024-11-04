import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import handleChange from '../../util/handle-change';

import '../../stylesheet/form.scss';
import '../../stylesheet/auth.scss';

const Register = ({ registerNewUser }) => {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });

  const isMatchingPasswords = newUser.password === newUser.confirmPassword;

  const handleRegisterClick = () => {
    if (!isMatchingPasswords) {
      return;
    }

    registerNewUser({ username: newUser.username, password: newUser.password });
    navigate('/');
  };
  return (
    <section className="form auth">
      <header>
        <h1>Register</h1>
      </header>

      <form>
        <fieldset>
          <fieldset>
            <label htmlFor="username">Username</label>
            <input
              name="username"
              id="username"
              type="text"
              value={newUser.username}
              onChange={(event) => handleChange(event, setNewUser)}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="password">Password</label>
            <input
              name="password"
              id="password"
              type="password"
              value={newUser.password}
              onChange={(event) => handleChange(event, setNewUser)}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              name="confirmPassword"
              id="confirmPassword"
              type="password"
              value={newUser.confirmPassword}
              onChange={(event) => handleChange(event, setNewUser)}
            />
          </fieldset>
        </fieldset>
        {!isMatchingPasswords && <p>Passwords do not match.</p>}
        <fieldset>
          <button onClick={handleRegisterClick}>Register</button>

          <Link to="/">Login</Link>
        </fieldset>
      </form>
    </section>
  );
};

export default Register;
