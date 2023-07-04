import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';


export default function AuthPage({ setUser }) {
  const [showSignUp, setShowSignUp] = useState(false);
  let navigate = useNavigate();
  async function handleSignUpOrLogin() {
    navigate('/budgets')
  }
  return (
    <main>
      <h1>Welcome to SplitSense</h1>
      <button onClick={() => setShowSignUp(!showSignUp)}>{showSignUp ? 'Log In' : 'Sign Up'}</button>
      { showSignUp ?
          <SignUpForm setUser={setUser} handleSignUpOrLogin={handleSignUpOrLogin} />
          :
          <LoginForm setUser={setUser} handleSignUpOrLogin={handleSignUpOrLogin} />
      }
    </main>
  );
};