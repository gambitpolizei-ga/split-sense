import { useState } from 'react'; // Import the useState hook from React
import * as usersService from '../../utilities/users-service'; // Import the users-service module

export default function LoginForm({ setUser }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  }); // Initialize state variables for storing the user's credentials
  const [error, setError] = useState(''); // Initialize state variable for storing login error message

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError('');
  }; // Event handler to update the credentials state & clear any error messages

  const handleSignUpOrLogin = async () => {
    try {
      const user = await usersService.login(credentials);
      setUser(user);
      window.location.href = '/budgets';
    } catch {
      setError('Log In Failed - Try Again');
    }
  }; // Asynchronous function to handle user login or signup

  async function handleSubmit(evt) {
    evt.preventDefault();
    handleSignUpOrLogin();
  }; // Event handler to handle form submission by calling the handleSignUpOrLogin function

  return (
    <div>
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="text" name="email" value={credentials.email} onChange={handleChange} required />
          <label>Password</label>
          <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
          <button type="submit">Log In</button>
        </form>
      </div>
      <p className="error-message">&nbsp;{error}</p>
    </div>
  );
};